import React from "react";
import {
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableHighlight,
    Pressable
} from 'react-native'
import * as COLORS from '../../assets/colors'


// TODO: Fix the buttons positioning,
//  add confirm button that sends the information and if it returns
//   a key start new screen
function LoginScreen() {
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    function buttonPressed(v) {
        setPassword(password);
        console.log(password)
    }

    function trimPassword() {
        if (password.length >= 1)
            setPassword(password.slice(0, -1));
    }

    function RandomButtons() {
        const order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const elementContainer = [];
    
        while (order.length > 0) {
            const num = order.pop(Math.floor(Math.random() * (order.length)));
    
            elementContainer.push(
                <TouchableHighlight
                    key={num}
                    onPress={() => buttonPressed.bind(num)}
                    style={styles.keyboard.button}
                >
                    <Text>{num}</Text>
                </TouchableHighlight>
            )
        }
        return elementContainer;
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
                <Pressable style={[styles.credentials.input, styles.buttons.login, ]}>
                    <Text >Login</Text>
                </Pressable>
            </View>
            {/* <View style={styles.keyboard.container}>
                <RandomButtons/>
            </View> */}
            {/* <TouchableHighlight
                    style={styles.keyboard.button}
                    onPress={trimPassword}
                >
                    <Text>{"<"}</Text>
                </TouchableHighlight> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex:1,
      padding: '5%'
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
            padding:10,
            borderRadius:100
        }
    },
    buttons:{
        login:{
            alignItems:"center",
            justifyContent:"center",
            backgroundColor: COLORS.BUTTONS_COLOR,
        }
    },

    keyboard: {
        container: {
            width: 360,
            height: 480,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        button: {
            width: 120,
            height: 120,
            backgroundColor: "grey",
        }
    }
  });
  

export default LoginScreen;