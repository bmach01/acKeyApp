import React, {useState, useEffect} from 'react';
import KeyScreen from './screens/KeyScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getUniqueId} from 'react-native-device-info';
import Storage from './model/Storage';
import {Text, View, ActivityIndicator} from 'react-native';
import {AppState, StyleSheet} from 'react-native';
import {enableScreens} from 'react-native-screens';

const Stack = createNativeStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [appState, setAppState] = useState(AppState.currentState);
  const [showWhiteScreen, setShowWhiteScreen] = useState(false);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // The app has come to the foreground
        setShowWhiteScreen(false);
      } else if (nextAppState.match(/inactive|background/)) {
        // The app is going to the background
        setShowWhiteScreen(true);
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    const load = async () => {
      const storage = Storage.getInstance();
      try {
        await storage.init();
        storage.imei = (await getUniqueId()).toString();

        // Login without credentials:
        // There is a session and there is a key -> key is still valid
        const session = parseInt(storage.getSetting(Storage.keys.SESSION));
        const key = storage.getSetting(Storage.keys.KEY);

        if (session > Date.now() && key !== '') {
          setInitialScreen('KeyScreen');
        }
      } catch (error) {
        console.log('loginscreen load error:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={showWhiteScreen ? SettingsScreen : LoginScreen}>
        <Stack.Screen
          name="LoginScreen"
          options={{headerBackVisible: false}}
          component={showWhiteScreen ? SettingsScreen : LoginScreen}
        />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen
          name="KeyScreen"
          options={{headerBackVisible: false}}
          component={KeyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  whiteScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});

export default App;
