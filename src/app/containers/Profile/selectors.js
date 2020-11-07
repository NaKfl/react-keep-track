import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectProfileState = state => state.profile;

export const makeSelectProfileInfo = createSelector(
  selectProfileState,
  profile => get('info', profile),
);

export const makeSelectEditProfileStatus = createSelector(
  selectProfileState,
  profile => get('status.edit', profile),
);

export const makeSelectGetProfileStatus = createSelector(
  selectProfileState,
  profile => get('status.get', profile),
);

export const makeSelectProfileError = createSelector(
  selectProfileState,
  profile => get('error', profile),
);
