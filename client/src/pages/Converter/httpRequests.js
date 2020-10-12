import Axios from 'axios';

import { SearchCountryUrl, GetAllCurrenciesUrl } from '../../constants/urls';

export async function searchCountryInfo(country, baseCurrency) {
  try {
    const response = await Axios.get(SearchCountryUrl, {
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
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.replace('/login');
    }
    throw new Error('Failed to fetch data!');
  }
}

export async function getCurrenciesList() {
  try {
    const response = await Axios.get(GetAllCurrenciesUrl, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return response.data.data;
  } catch (error) {
    // Relogin in case of 401
    console.log(error)
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.replace('/login');
    }
    throw new Error('Failed to fetch data!');
  }
}
