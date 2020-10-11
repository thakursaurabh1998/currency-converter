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

export async function searchCountryInfo(country, baseCurrency) {
  try {
    const response = await Axios.get(`${baseUrl}/v1/country/search`, {
      params: {
        query: country,
        baseCurrency,
      },
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data.data.countries;
  } catch (error) {
    // Relogin in case of 401
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.replace('/login');
    }
    throw new Error('Failed to fetch data!');
  }
}

export async function getCurrenciesList() {
  try {
    const response = await Axios.get(`${baseUrl}/v1/currency/all`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data.data;
  } catch (error) {
    // Relogin in case of 401
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.replace('/login');
    }
    throw new Error('Failed to fetch data!');
  }
}
