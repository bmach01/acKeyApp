import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = {
    SESSION_LIMIT: "session_limit",
    DEFAULT_SESSION_LIMIT: "default_session_limit",
    LAST_LOGIN_STAMP: "last_login_stamp",
    ACCOUNT_EMAIL: "account_email",

    sessionLimit: null,
    defaultSessionLimit: null,
    lastLoginStamp: null,
    accountEmail: null,

    saveSettings: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error saving data:', error);
            return null;
        }
    },
    
    loadAllSettings: async () => {
        try {
            sessionLimit = await AsyncStorage.getItem(SESSION_LIMIT);
            defaultSessionLimit = await AsyncStorage.getItem(DEFAULT_SESSION_LIMIT);
            lastLoginStamp = await AsyncStorage.getItem(LAST_LOGIN_STAMP);
            accountEmail = await AsyncStorage.getItem(ACCOUNT_EMAIL);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    }
}