import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Barcode from 'react-native-barcode-builder';
import { sendLogout } from '../model/Connections';
import Storage from '../model/Storage';

const KeyScreen = ({navigation}) => {
    
    const storage = Storage.getInstance();
    // for debug
    const key = storage.getSetting(Storage.keys.KEY) === '' ? 'DUMMY_KEY_DUMMY_KEY_DUMMY_KEY' : storage.getSetting(Storage.keys.KEY);

    const logout = async () => {

        // !!!DEBUG ONLY!!!
        if (!storage.login && !storage.password) {
            console.log('DEBUG LOGOUT');
            storage.saveSetting(Storage.keys.SESSION, 0);
            navigation.navigate('LoginScreen');
            return;
        }


        try {
            const success = await sendLogout(storage.login, storage.password, storage.imei);

            if (success) {
                storage.saveSetting(Storage.keys.SESSION, 0);
                storage.saveSetting(Storage.keys.KEY, '');
                navigation.navigate('LoginScreen');
            }
            else {
                console.log('logout failed!');
            }
        }
        catch(error) {
            console.log(`logout error: ${error}`);
        }

    }

    const goToSettings = () => {
        navigation.navigate('SettingsScreen');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.barcode.container}>
                <Text style={styles.barcode.figure}>
                    <Barcode 
                    value={key}
                    format='CODE128' 
                    width={0.912}
                    height={150}
                    />
                </Text>
                <Text style={styles.barcode.key}>{key}</Text>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity onPress={logout} style={styles.menu.button}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToSettings} style={styles.menu.button}>
                    <Text>Settings</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex:1,
      padding: '5%'
    },
  
    barcode: {
      container: {
        width: '100%',
        flex: 1,
        alignItems: 'center'
      },
      figure: {

      },
      key: {
        textAlign: 'center'
      }
    },

    menu: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        button: {
            margin: 10,
            width: 150,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            text: {

            }
        }
    }
  });
  

export default KeyScreen;