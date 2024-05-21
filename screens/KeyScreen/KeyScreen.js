import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Barcode from "react-native-barcode-builder";
import { useNavigation } from '@react-navigation/native';


function KeyScreen(props) {
    
    let key = !props.route.params.key ? 'DUMMYKEY_DUMMYKEY_DUMMYKEY_DUMMY' : props.route.params.key;
    const navigation = useNavigation();

    const logout = () => {

        console.log("logout");
        navigation.navigate('LoginScreen');
    }

    const goToSettings = () => {

        console.log("go to settings");
        navigation.navigate('SettingsScreen')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.barcode.container}>
                <Text style={styles.barcode.figure}>
                    <Barcode 
                    value={key}
                    format="CODE128" 
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