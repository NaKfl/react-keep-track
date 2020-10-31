import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const selectRegisterState = state => state.register;

const makeSelectRegisterStatus = createSelector(selectRegisterState, register =>
  get('status', register),
);

const makeSelectRegisterError = createSelector(selectRegisterState, register =>
  get('error', register),
);

export { makeSelectRegisterError, makeSelectRegisterStatus };
