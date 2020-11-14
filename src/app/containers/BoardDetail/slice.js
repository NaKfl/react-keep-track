import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/fp/set';
import flow from 'lodash/fp/flow';
import { ACTION_STATUS } from 'utils/constants';

export const initialState = {
  info: {},
  data: [],
  error: null,
  status: {
    getInfo: '',
    getData: '',
    createCard: '',
    deleteCard: '',
    editCard: '',
    updateIndexCard: '',
  },
};

const boardDetailSlice = createSlice({
  name: 'boardDetail',
  initialState,
  reducers: {
    getBoardInfo(state) {
      return flow(
        set('error', null),
        set('status.getInfo', ACTION_STATUS.PENDING),
      )(state);
    },

    getBoardInfoSuccess(state, action) {
      return flow(
        set('info', action.payload),
        set('status.getInfo', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getBoardInfoFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.getInfo', ACTION_STATUS.FAILED),
      )(state);
    },

    getBoardDetail(state) {
      return flow(
        set('error', null),
        set('status.getData', ACTION_STATUS.PENDING),
      )(state);
    },

    getBoardDetailSuccess(state, action) {
      return flow(
        set('data', action.payload),
        set('status.getData', ACTION_STATUS.SUCCESS),
      )(state);
    },

    getBoardDetailFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.getData', ACTION_STATUS.FAILED),
      )(state);
    },

    createCard(state) {
      return flow(
        set('error', null),
        set('status.createCard', ACTION_STATUS.PENDING),
      )(state);
    },

    createCardSuccess(state) {
      return set('status.createCard', ACTION_STATUS.SUCCESS)(state);
    },

    createCardFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.createCard', ACTION_STATUS.FAILED),
      )(state);
    },

    deleteCard(state) {
      return flow(
        set('error', null),
        set('status.deleteCard', ACTION_STATUS.PENDING),
      )(state);
    },

    deleteCardSuccess(state) {
      return set('status.deleteCard', ACTION_STATUS.SUCCESS)(state);
    },

    deleteCardFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.deleteCard', ACTION_STATUS.FAILED),
      )(state);
    },

    editCard(state) {
      return flow(
        set('error', null),
        set('status.editCard', ACTION_STATUS.PENDING),
      )(state);
    },

    editCardSuccess(state) {
      return set('status.editCard', ACTION_STATUS.SUCCESS)(state);
    },

    editCardFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.editCard', ACTION_STATUS.FAILED),
      )(state);
    },

    updateIndexCard(state) {
      return flow(
        set('error', null),
        set('status.updateIndexCard', ACTION_STATUS.PENDING),
      )(state);
    },

    updateIndexCardSuccess(state) {
      return set('status.updateIndexCard', ACTION_STATUS.SUCCESS)(state);
    },

    updateIndexCardFailed(state, action) {
      return flow(
        set('error', action.payload),
        set('status.updateIndexCard', ACTION_STATUS.FAILED),
      )(state);
    },

    reset(state) {
      return flow(
        set('error', null),
        set('status.getInfo', ''),
        set('status.getData', ''),
        set('status.createCard', ''),
        set('status.deleteCard', ''),
        set('status.editCard', ''),
        set('status.updateIndexCard', ''),
      )(state);
    },
  },
});

export const { actions, reducer, name: sliceKey } = boardDetailSlice;
