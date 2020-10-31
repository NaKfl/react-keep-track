import { combineReducers } from '@reduxjs/toolkit';
import { reducer as authenticationReducer } from 'app/containers/Authentication/slice';

export const createReducer = (injectedReducers = {}) => {
  return combineReducers({
    authentication: authenticationReducer,
    ...injectedReducers,
  });
};
