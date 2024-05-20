import React from 'react'
import KeyScreen from './screens/KeyScreen/KeyScreen';
import Settings from './model/Settings';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native'
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  let dummyKey = 'mNvoeJKrQylpHcFGxbtqauPZSsdRwUOimNvoeJKrQylpHcFGxbtqauPZSsdRwUOi';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
        <Stack.Screen name="KeyScreen" component={KeyScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;