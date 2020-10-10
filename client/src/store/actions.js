export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';

export const setIsAuthenticated = (isAuthenticated) => ({
  type: SET_IS_AUTHENTICATED,
  isAuthenticated,
});
