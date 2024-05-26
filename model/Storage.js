import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
    static keys = {
        KEY: "@key",
        LIMIT: "@limit",
        SESSION: "@session"
    };

    static #instance = null;
    static #initialized = false;

    // Session bound (temporary)
    login = "";
    password = "";
    imei = "";

    #persistent = new Map([
        [Storage.keys.KEY, "DUMMY_KEY_DUMMY_KEY_DUMMY_KEY"],
        [Storage.keys.LIMIT, 5* 60 * 1000],
        [Storage.keys.SESSION, 0]
    ]);


    static getInstance = () => {
        if (!this.instance) {
            this.instance = new Storage();
        }
        return this.instance;
    }

    init = async () => {
        if (Storage.#initialized) return;
        this.#loadPersisted();
        Storage.#initialized = true;
    }

    saveSetting = async(key, value) => {
        if (this.#persistent.has(key)) {
            this.#persistent.set(key, value);
            try {
                await AsyncStorage.setItem(key, value.toString());
            }
            catch (error) {
                console.log("saveSettings error: ", error);
            }
        }
        else {
            throw new Error("Unknown key");
        }
    };

    getSetting = (key) => {
        if (this.#persistent.has(key)) {
            return this.#persistent.get(key);
        }
        else {
            throw new Error("Unknown key");
        }
    }

    #loadPersisted = async () => {
        [...this.#persistent.keys()].forEach( async (key) => {
            try {
                const v = await AsyncStorage.getItem(key);
                if (typeof v !== 'undefined' && v !== "") {
                    this.#persistent.set(key, v);
                }
            }
            catch (error) {
                console.log(`Storage.loadPersisted error: ${error}`)
            }
        });
    }
}
