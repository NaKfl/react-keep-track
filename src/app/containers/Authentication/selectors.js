import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectAuthenticationState = state => state.authentication;

const makeSelectIsAuthenticated = createSelector(
  selectAuthenticationState,
  authentication => get('isAuthenticated', authentication),
);

const makeSelectAuthenticationStatus = createSelector(
  selectAuthenticationState,
  authentication => get('status', authentication),
);

const makeSelectAuthenticationError = createSelector(
  selectAuthenticationState,
  authentication => get('error', authentication),
);

export {
  makeSelectIsAuthenticated,
  makeSelectAuthenticationError,
  makeSelectAuthenticationStatus,
};
