import { getUniqueId } from 'react-native-device-info';
import Settings from './Settings';

export async function sendLogin(login, password) {
  const imei = (await getUniqueId()).toString();
  const session = "";

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 2000);

  console.log(`try with: ${login}:${password}:${imei}`);

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