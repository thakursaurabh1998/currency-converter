import React from 'react';

import reducer from './reducers';
import * as actions from './actions';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('accessToken')),
  setIsAuthenticated: null,
};

const UserContext = React.createContext(initialState);

function Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    isAuthenticated: state.isAuthenticated,
    setIsAuthenticated: (isAuthenticated) => {
      dispatch(actions.setIsAuthenticated(isAuthenticated));
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, Provider };
