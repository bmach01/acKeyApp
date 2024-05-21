import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KEYS from '../assets/storageKeys';

var instance;

class Storage {
    #values = new Map([
        [KEYS.SESSION_LIMIT, ""],
        [KEYS.LAST_LOGIN_STAMP, ""],
        [KEYS.CURRENT_KEY, ""]
    ]);

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    loadAllSettings = async () => {
        try {
            this.#values.set(KEYS.SESSION_LIMIT,  parseInt(await AsyncStorage.getItem(KEYS.SESSION_LIMIT)));
        }
        catch(error) {
            this.#values.set(KEYS.SESSION_LIMIT, 5);
        }

        try {
            this.#values.set(KEYS.LAST_LOGIN_STAMP, parseInt(await AsyncStorage.getItem(KEYS.LAST_LOGIN_STAMP)));
        }
        catch(error) {
            this.#values.set(KEYS.SESSION_LIMIT,  parseInt(Date.now()));
        }

        try {
            this.#values.set(KEYS.CURRENT_KEY, await AsyncStorage.getItem(KEYS.CURRENT_KEY));
        }
        catch(error) {
            this.#values.set(KEYS.SESSION_LIMIT, null);
        }
    }

    saveSettings = (key, value) => {
        if (!this.#values.has(key))
            throw new Error("Invalid key");
        
        AsyncStorage.setItem(key, value)
        .then(() => {this.#values.set(key, value);})
        .catch(error => console.log(error));
    }

    getSetting = (key) => {
        if (!this.#values.has(key))
            throw new Error("Invalid key");
        return this.#values.get(key);
    }

}

export default Storage;