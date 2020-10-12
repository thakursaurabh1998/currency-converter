const baseUrl =
  process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:8081';

export const LoginUrl = `${baseUrl}/v1/auth/login`;
export const SearchCountryUrl = `${baseUrl}/v1/country/search`;
export const GetAllCurrenciesUrl = `${baseUrl}/v1/currency/all`;
