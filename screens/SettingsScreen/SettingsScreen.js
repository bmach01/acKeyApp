import React from "react"
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import NumericInput from 'react-native-numeric-input';
import * as KEYS from '../../assets/storageKeys';
import Storage from '../../model/Storage';

function SettingsScreen() {
  const storage = new Storage();
  let initV = parseInt(storage.getSetting(KEYS.SESSION_LIMIT));
  let save;

  const handleIncrement = (v) => {
    clearTimeout(save);
    save = setTimeout(() => {
      storage.saveSettings(KEYS.SESSION_LIMIT, v.toString());
    }, 500);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settings.container}>
        <View style={styles.settings.section}>
          <Text style={styles.settings.section.title}>Session limit</Text>
          <NumericInput 
            valueType='integer'
            initValue={initV}
            onChange={
              value => {
                console.log(value)
                handleIncrement(value)
              }
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
