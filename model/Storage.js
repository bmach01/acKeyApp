import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  static keys = {
    KEY: '@key',
    LIMIT: '@limit',
    SESSION: '@session',
    PASSWORD: '@password',
    LOGIN: '@login',
  };

  static #instance = null;
  static #initialized = false;

  #persistent = new Map([
    [Storage.keys.KEY, ''],
    [Storage.keys.LIMIT, 5 * 60 * 1000],
    [Storage.keys.SESSION, 0],
    [Storage.keys.LOGIN, ''],
    [Storage.keys.PASSWORD, ''],
  ]);

  imei = '';

  static getInstance = () => {
    if (!this.#instance) {
      this.#instance = new Storage();
    }
    return this.#instance;
  };

  init = async () => {
    if (Storage.#initialized) return;
    await this.#loadPersisted();
    Storage.#initialized = true;
  };

  saveSetting = async (key, value) => {
    if (this.#persistent.has(key)) {
      this.#persistent.set(key, value);
      try {
        await AsyncStorage.setItem(key, value.toString());
      } catch (error) {
        console.log('saveSettings error: ', error);
      }
    } else {
      throw new Error('Unknown key');
    }
  };

  getSetting = key => {
    if (this.#persistent.has(key)) {
      return this.#persistent.get(key);
    } else {
      throw new Error('Unknown key');
    }
  };

  #loadPersisted = async () => {
    try {
      const keys = [...this.#persistent.keys()];
      const values = await Promise.all(
        keys.map(async key => {
          try {
            const v = await AsyncStorage.getItem(key);
            if (typeof v !== 'undefined' && v !== '' && v != null) {
              this.#persistent.set(key, v);
            }
            console.log(`${key} : ${v}`);
          } catch (error) {
            console.log(`Storage.loadPersisted error: ${error}`);
          }
        }),
      );
    } catch (error) {
      console.log(`Storage.loadPersisted values error: ${error}`);
    }
  };
}
