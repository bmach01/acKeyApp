import { getUniqueId } from 'react-native-device-info';
import * as KEYS from '../assets/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function sendLogin(login, password) {
  const imei = (await getUniqueId()).toString();

  const sessionLimit = await AsyncStorage.getItem(KEYS.SESSION_LIMIT) * 1000 * 60;
  const lastLoginStamp = await AsyncStorage.getItem(KEYS.LAST_LOGIN_STAMP) * 1
  const session = sessionLimit + lastLoginStamp;

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 2000);

  console.log(`try with: ${login}:${password}:${imei}:${session}`);

  return fetch('http://10.0.2.2:8080/user/login', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Authorization': `${login}:${password}:${imei}`
      }
    }).then(response => {
      if (!response.ok) {
        return null;
      }

      return response.headers.get('Authenticator');
    });
}