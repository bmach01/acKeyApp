import React from 'react'
import KeyScreen from './screens/KeyScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" options={{headerBackVisible:false}} component={LoginScreen}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
        <Stack.Screen name="KeyScreen" options={{headerBackVisible:false}} component={KeyScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;