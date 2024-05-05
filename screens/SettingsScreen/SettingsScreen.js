import React from "react"
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settings.container}></View>
      <View style={styles.menu}>
        <TouchableOpacity onPress={console.log()} style={styles.menu.button}>
          <Text style={styles.menu.button.text}>Log Out</Text>{/*TODO: Change it to icon later */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: "5%",
  },
  settings:{
    container:{

    },

  },
  menu:{
    button:{

    }
  }
})

export default SettingsScreen
