import React, { useEffect } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Barcode from 'react-native-barcode-builder';
import Storage from '../model/Storage';
import { logout } from '../model/Shared';

const KeyScreen = ({navigation}) => {
    
    const storage = Storage.getInstance();
    // for debug
    const key = storage.getSetting(Storage.keys.KEY) === '' ? 'DUMMY_KEY_DUMMY_KEY_DUMMY_KEY' : storage.getSetting(Storage.keys.KEY);

    const handleLogout = async () => {
        await logout(navigation, storage);
    }

    const goToSettings = () => {
        navigation.navigate('SettingsScreen');
    }

    useEffect(() => {

        // Session expires
        const timeToGo = storage.getSetting(Storage.keys.SESSION) - Date.now();
        console.log(timeToGo);
        setTimeout(async () => {
            await logout(navigation, storage, false);
        }, timeToGo);
    });

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
                <TouchableOpacity onPress={handleLogout} style={styles.menu.button}>
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