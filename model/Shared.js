import { sendLogout } from "./Connections";
import Storage from './Storage';

export const logout = async (navigation, storage, manual = true) => {

    // !!!DEBUG ONLY!!!
    if (!storage.getSetting(Storage.keys.LOGIN) && !storage.getSetting(Storage.keys.PASSWORD) && manual) {
        console.log('DEBUG LOGOUT');
        storage.saveSetting(Storage.keys.SESSION, 0);
        navigation.navigate('LoginScreen');
        return;
    }

    try {
        let success = true;

        // No need to send logout request if it's not necessary
        if (manual)
            success = await sendLogout(storage.getSetting(Storage.keys.LOGIN), storage.getSetting(Storage.keys.PASSWORD), storage.imei);

        if (success) {
            storage.saveSetting(Storage.keys.SESSION, 0);
            storage.saveSetting(Storage.keys.KEY, '');
            navigation.navigate('LoginScreen');
        }
        else {
            console.log('logout failed!');
        }
    }
    catch(error) {
        console.log(`logout error: ${error}`);
    }

}