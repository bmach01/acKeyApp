import AsyncStorage from '@react-native-async-storage/async-storage';

class Settings {
    constructor() {
        this.loadAllSettings();
    }

    static SESSION_LIMIT = "session_limit";
    static LAST_LOGIN_STAMP = "last_login_stamp";
    static ACCOUNT_EMAIL = "account_email";

    static DefaultLimit = "5H";

    sessionLimit = "";
    lastLoginStamp = "";
    accountEmail = "";

    saveSettings = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
    
    loadAllSettings = async () => {
        try {
            sessionLimit = await AsyncStorage.getItem(Settings.SESSION_LIMIT);
            lastLoginStamp = await AsyncStorage.getItem(Settings.LAST_LOGIN_STAMP);
            accountEmail = await AsyncStorage.getItem(Settings.ACCOUNT_EMAIL);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    }
}

export default Settings;