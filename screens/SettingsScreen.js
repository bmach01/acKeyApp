import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native"
import NumericInput from 'react-native-numeric-input';
import Storage from "../model/Storage";

function SettingsScreen() {

  const storage = Storage.getInstance();
  const initValue = parseInt(storage.getSetting(Storage.keys.LIMIT)) / 60 / 1000;


  const onChangeLimit = async (v) => {
    await storage.saveSetting(Storage.keys.LIMIT, v * 60 * 1000);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settings.container}>
        <View style={styles.settings.section}>
          <Text style={styles.settings.section.title}>Session limit</Text>
          <NumericInput 
            valueType='integer'
            initValue={initValue}
            onChange={
              value => {
                onChangeLimit(value);
              }
            }
            minValue={5}
            maxValue={60}
            step={5}
            rounded
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'
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
