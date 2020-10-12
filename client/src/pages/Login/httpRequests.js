import Axios from 'axios';

import { LoginUrl } from '../../constants/urls';

export async function login(email, password) {
  try {
    const response = await Axios.post(LoginUrl, { email, password });
    return response.data.data.accessToken;
  } catch (error) {
    throw new Error('Authentication failed!');
  }
}
