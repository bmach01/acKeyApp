import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    // Temporary
    login: "",
    password: "",
    imei: "",

    // Persistent
    settings: {
        session: 0,
        limit: 5 * 60 * 1000,
        key: "DUMMY_KEY_DUMMY_KEY_DUMMY_KEY"
    },

    saveSettings: async () => {
        try {
            await AsyncStorage.setItem("@session", storage.settings.session.toString());
        }
        catch (error) {
            console.log("saveSettings error: ", error);
        }

        try {
            await AsyncStorage.setItem("@limit", storage.settings.limit.toString());
        }
        catch (error) {
            console.log("saveSettings error: ", error);
        }

        try {
            await AsyncStorage.setItem("@key", storage.settings.key.toString());
        }
        catch (error) {
            console.log("saveSettings error: ", error);
        }
    },

    loadSettings: async () => {
        try {
            const value = parseInt(await AsyncStorage.getItem("@session"));
            if (!isNaN(value)) {
                storage.settings.session = value;
            }
        } catch (error) {
            console.log("loadSettings error (session): ", error);
        }

        try {
            const value = parseInt(await AsyncStorage.getItem("@limit"));
            if (!isNaN(value)) {
                storage.settings.limit = value;
            }
        } catch (error) {
            console.log("loadSettings error (limit): ", error);
        }

        try {
            const value = parseInt(await AsyncStorage.getItem("@key"));
            if (!isNaN(value)) {
                storage.settings.key = value;
            }
        } catch (error) {
            console.log("loadSettings error (limit): ", error);
        }
    }
}
