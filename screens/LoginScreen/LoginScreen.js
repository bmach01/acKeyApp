import React from "react";
import {
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    View,
    Pressable
} from 'react-native'
import { sendLogin } from '../../model/Connections'
import * as COLORS from '../../assets/colors'
import { useNavigation } from '@react-navigation/native';


function LoginScreen() {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigation = useNavigation();

    async function attemptLogin() {
        try {
            const key = await sendLogin(login, password);

            // DEBUG ONLY!!!
            if (!login && !password) {
                navigation.navigate('KeyScreen');
                return;
            }

            if (key != null) {
                navigation.navigate('KeyScreen');
            }
            else {
                // TODO: handle wrong credentials here
            }
            console.log("attemptLogin3", key);
        }
        catch (error) {
            console.log(error);
            // TODO: handle error here?
        }
        
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
                    // editable={false}
                    secureTextEntry
                />
                <Pressable 
                    style={[styles.credentials.input, styles.buttons.login]}
                    onPress={attemptLogin}
                >
                    <Text >Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex:1,
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