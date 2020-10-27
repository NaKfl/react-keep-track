import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  boards: [],
  status: {
    get: '',
  },
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getBoards(state) {
      return flow(set('status.get', ACTION_STATUS.PENDING))(state);
    },

    getBoardsSuccess(state, action) {
      return flow(
        set('boards', action.payload),
        set('status.get', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getBoardsFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.get', ACTION_STATUS.FAILED),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = dashboardSlice;
