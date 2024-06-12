import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {sendLogin} from '../model/Connections';
import * as COLORS from '../assets/colors';
import Storage from '../model/Storage';

const LoginScreen = ({navigation}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const storage = Storage.getInstance();

    // !!!DEBUG ONLY!!!
    if (!login && !password) {
      console.log('DEBUG LOGIN');
      storage.saveSetting(
        Storage.keys.SESSION,
        Date.now() + storage.getSetting(Storage.keys.LIMIT),
      );
      navigation.navigate('KeyScreen');
      return;
    }

    try {
      const newSession =
        Date.now() + parseInt(storage.getSetting(Storage.keys.LIMIT));
      await storage.saveSetting(Storage.keys.SESSION, newSession);

      const key = await sendLogin(login, password, storage.imei, newSession);

      // Success
      if (key != null) {
        await storage.saveSetting(Storage.keys.KEY, key);
        storage.saveSetting(Storage.keys.LOGIN, login);
        storage.saveSetting(Storage.keys.PASSWORD, password);
        navigation.navigate('KeyScreen');
      } else {
        // TODO: handle wrong credentials here
      }
    } catch (error) {
      console.log(error);
      // TODO: handle unable to connect to the server
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.credentials.container}>
        <TextInput
          style={styles.credentials.input}
          onChangeText={t => setLogin(t)}
          value={login}
          placeholder="Login"
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.credentials.input}
          onChangeText={t => setPassword(t)}
          value={password}
          placeholder="Password"
          keyboardType="numeric"
          placeholderTextColor={'black'}
          secureTextEntry
        />
        <Pressable
          style={[styles.credentials.input, styles.buttons.login]}
          onPress={handleLogin}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: '5%',
    color: 'black',
  },

  credentials: {
    container: {
      height: 50,
      width: 300,
      margin: 100,
    },
    input: {
      height: 50,
      margin: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 100,
      color: 'black',
    },
  },
  buttons: {
    login: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.BUTTONS_COLOR,
      color: 'black',
    },
  },
});

export default LoginScreen;
