import Axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:8081';

export async function login(email, password) {
  try {
    const response = await Axios.post(`${baseUrl}/v1/auth/login`, {
      email,
      password,
    });
    return response.data.data.accessToken;
  } catch (error) {
    throw new Error('Authentication failed!');
  }
}
