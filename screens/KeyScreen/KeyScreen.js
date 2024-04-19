import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Barcode from "react-native-barcode-builder";

function KeyScreen(props) {
    
    let key = !props.keyCode ? 'DUMMYKEY_DUMMYKEY_DUMMYKEY_DUMMYKEY_DUMMYKEY_DUMMYKEY_DUMMYKEY_D' : props.keyCode;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.barcode.container}>
                <Text style={styles.barcode.figure}>
                    <Barcode 
                    value={key}
                    format="CODE128" 
                    width={0.97} //TODO: Change it so it fits neatly
                    height={150}
                    />
                </Text>
                <Text style={styles.barcode.key}>{key}</Text>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity onPress={console.log("Button1pressed")} style={styles.menu.button}>
                </TouchableOpacity>
                <TouchableOpacity onPress={console.log("Button1pressed")} style={styles.menu.button}>
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

      }
    },

    menu: {
        button: {
            text: {

            }
        }
    }
  });
  

export default KeyScreen;