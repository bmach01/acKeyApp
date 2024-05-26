import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native"
import NumericInput from 'react-native-numeric-input';
import { storage } from "../model/Storage";

function SettingsScreen() {

  const onChangeLimit = async (v) => {
    storage.settings.limit = v * 60 * 1000;
    storage.saveSettings()
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settings.container}>
        <View style={styles.settings.section}>
          <Text style={styles.settings.section.title}>Session limit</Text>
          <NumericInput 
            valueType='integer'
            initValue={storage.settings.limit / 60 / 1000}
            onChange={
              value => {
                console.log(value)
                onChangeLimit(value)
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
