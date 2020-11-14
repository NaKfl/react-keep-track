import { createSlice } from '@reduxjs/toolkit';
import flow from 'lodash/fp/flow';
import set from 'lodash/fp/set';
import { ACTION_STATUS } from 'utils/constants';

const initialState = {
  boards: [],
  status: {
    get: '',
    create: '',
    delete: '',
    edit: '',
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

    createBoard(state) {
      return flow(set('status.create', ACTION_STATUS.PENDING))(state);
    },

    createBoardSuccess(state) {
      return set('status.create', ACTION_STATUS.SUCCESS)(state);
    },

    createBoardFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.create', ACTION_STATUS.FAILED),
      )(state);
    },

    deleteBoard(state) {
      return flow(set('status.delete', ACTION_STATUS.PENDING))(state);
    },

    deleteBoardSuccess(state) {
      return set('status.delete', ACTION_STATUS.SUCCESS)(state);
    },

    editBoardFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.edit', ACTION_STATUS.FAILED),
      )(state);
    },

    editBoard(state) {
      return flow(set('status.edit', ACTION_STATUS.PENDING))(state);
    },

    editBoardSuccess(state) {
      return set('status.edit', ACTION_STATUS.SUCCESS)(state);
    },

    reset(state) {
      return flow(
        set('error', null),
        set('status.get', ''),
        set('status.create', ''),
        set('status.edit', ''),
        set('status.delete', ''),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = dashboardSlice;
