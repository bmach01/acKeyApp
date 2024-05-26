import React, { useEffect, useState } from 'react';
import { Text, TextInput, SafeAreaView, StyleSheet, View, Pressable, ActivityIndicator } from 'react-native'
import { sendLogin } from '../model/Connections'
import * as COLORS from '../assets/colors'
import Storage from '../model/Storage';
import { getUniqueId } from "react-native-device-info";


function LoginScreen({ navigation }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const storage = Storage.getInstance();
            try {
                await storage.init();
                storage.imei = (await getUniqueId()).toString();
            }
            catch(error) {
                console.log("loginscreen load error:", error);
            }
            finally {
                setLoading(false);
            }
        }
    
        load();
    }, []);
  
    const handleLogin = async () => {
        const storage = Storage.getInstance();

        // !!!DEBUG ONLY!!!
        if (!login && !password) {
            console.log("DEBUG LOGIN");
            navigation.navigate('KeyScreen', {key: null});
            return;
        }

        try {
            const newSession = Date.now() + parseInt(storage.getSetting(Storage.keys.LIMIT));
            await storage.saveSetting(Storage.keys.SESSION, newSession);

            const key = await sendLogin(login, password, storage.imei, newSession);

            // Success
            if (key != null) {
                await storage.saveSetting(Storage.keys.KEY, key);
                storage.login = login;
                storage.password = password;
                navigation.navigate('KeyScreen', {key: key});
            }
            else {
                // TODO: handle wrong credentials here
            }
        }
        catch (error) {
            console.log(error);
            // TODO: handle unable to connect to the server
        }
        
    }

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.credentials.container}>
                <TextInput
                    style={styles.credentials.input}
                    onChangeText={t => setLogin(t)}
                    value={login}
                    placeholder="Login"
                />
                <TextInput
                    style={styles.credentials.input}
                    onChangeText={t => setPassword(t)}
                    value={password}
                    placeholder="Password"
                    keyboardType="numeric"
                    secureTextEntry
                />
                <Pressable 
                    style={[styles.credentials.input, styles.buttons.login]}
                    onPress={handleLogin}
                >
                    <Text>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      padding: '5%',
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
            color: "black"
        }
    },
    buttons:{
        login:{
            alignItems:"center",
            justifyContent:"center",
            backgroundColor: COLORS.BUTTONS_COLOR,
            color: "black"
        }
    },
});

export default LoginScreen;
