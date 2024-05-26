import {encode as btoa} from 'base-64'

export async function sendLogin(login, password, imei, session) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);

  try {
    const response = await fetch('http://10.0.2.2:8080/user/login', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Authorization': btoa(`${login}:${password}:${imei}:${session}`)
      }
    });

    if (!response.ok) {
      return null;
    }

    return response.headers.get('Authenticator');
  } catch (error) {
    console.log(`sendLogin: ${error}`);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function sendLogout(login, password, imei) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);

  try {
    const response = await fetch('http://10.0.2.2:8080/user/logout', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Authorization': btoa(`${login}:${password}:${imei}`)
      }
    });

    return response.ok;
  } catch (error) {
    console.log(`sendLogout: ${error}`);
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}