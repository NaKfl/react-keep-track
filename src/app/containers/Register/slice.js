import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';
export const initialState = {
  isAuthenticated: false,
  status: '',
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    register(state) {
      return flow(
        set('error', null),
        set('status', ACTION_STATUS.PENDING),
      )(state);
    },

    registerSuccess(state) {
      return flow(
        set('isAuthenticated', true),
        set('status', ACTION_STATUS.SUCCESS),
      )(state);
    },

    registerFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = registerSlice;
