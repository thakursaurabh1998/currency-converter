import * as actions from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case actions.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.value,
      };
    default:
      return state;
  }
}
