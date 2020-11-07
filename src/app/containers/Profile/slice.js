import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  info: [],
  status: {
    get: '',
    edit: '',
  },
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile(state) {
      return flow(set('status.get', ACTION_STATUS.PENDING))(state);
    },

    getProfileSuccess(state, action) {
      return flow(
        set('info', action.payload),
        set('status.get', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getProfileFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.get', ACTION_STATUS.FAILED),
      )(state);
    },

    editProfile(state) {
      return flow(set('status.edit', ACTION_STATUS.PENDING))(state);
    },

    editProfileFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.edit', ACTION_STATUS.FAILED),
      )(state);
    },

    editProfileSuccess(state, action) {
      return flow(
        set('info', action.payload),
        set('status.get', ACTION_STATUS.SUCCESS),
      )(state);
    },

    editProfileFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.edit', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = profileSlice;
