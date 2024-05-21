import React from "react"
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import NumericInput from 'react-native-numeric-input'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KEYS from '../../assets/storageKeys';

function SettingsScreen() {

  const handleIncrement = async (v) => {
    clearTimeout(save);
    const save = setTimeout((v) => {
      try {
        AsyncStorage.setItem(KEYS.SESSION_LIMIT, v)
      }
      catch(error) {
        console.log("Session limit save error: ", error);
      }
    }, 2000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settings.container}>
        <View style={styles.settings.section}>
          <Text style={styles.settings.section.title}>Session limit</Text>
          <NumericInput 
            valueType='integer'
            initValue={AsyncStorage.getItem(KEYS.SESSION_LIMIT) * 1}
            onChange={
              value => handleIncrement(value)
            }
            minValue={5}
            maxValue={60}
            step={5}
            rounded
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    flex: 1,
    padding: "5%",
  },
  settings: {
    container: {
      width: '90%',
      padding: 10,
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      title: {
        flex: 1,
        textAlign: 'left',
        fontSize: 25,
        marginEnd: 10,
      },
    },
  },
});

export default SettingsScreen
