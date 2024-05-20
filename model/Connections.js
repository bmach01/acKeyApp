import { getUniqueId } from 'react-native-device-info';

export async function sendLogin(login, password) {
  const imei = (await getUniqueId()).toString();
  const session = "";

  console.log(`Attempt with: ${login}:${password}:${imei}`);

  return fetch('http://10.0.2.2:8080/user/login', {
      method: 'POST',
      headers: {
        'Authorization': `${login}:${password}:${imei}`
      }
    }).then(response => {

      if (!response.ok) {
        return null;
      }
      const key = response.headers.get('Authenticator');
      console.log("Got key: ", key);
      return key;
    });
}