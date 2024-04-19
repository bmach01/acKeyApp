import React from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native'

function LoginScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.credentials.container}>
                {/* Credentials Text */}
            </View>
            <View style={styles.keyboard}>
                {/* TODO: put element that generates randomly ordered 0-9 keyboard */}
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
  
  });
  

export default LoginScreen;