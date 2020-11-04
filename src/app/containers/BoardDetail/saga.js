import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import {
  getBoardDetail,
  getBoardInfo,
  createCard,
} from 'fetchers/boardDetailFetcher';

function* getBoardDetailWatcher() {
  yield takeLatest(actions.getBoardDetail, getBoardDetailTask);
}

function* getBoardDetailTask(action) {
  const { response, error } = yield call(getBoardDetailAPI, action.payload);
  if (response) {
    yield put(actions.getBoardDetailSuccess(response.result));
  } else {
    yield put(actions.getBoardDetailFailed(error.data));
  }
}

function getBoardDetailAPI(payload) {
  return getBoardDetail(payload);
}

function* getBoardInfoWatcher() {
  yield takeLatest(actions.getBoardInfo, getBoardInfoTask);
}

function* getBoardInfoTask(action) {
  const { response, error } = yield call(getBoardInfoAPI, action.payload);
  if (response) {
    yield put(actions.getBoardInfoSuccess(response.result));
  } else {
    yield put(actions.getBoardInfoFailed(error.data));
  }
}

function getBoardInfoAPI(payload) {
  return getBoardInfo(payload);
}

function* createCardWatcher() {
  yield takeLatest(actions.createCard, createCardTask);
}

function* createCardTask(action) {
  const { response, error } = yield call(createCardAPI, action.payload);
  if (response) {
    yield getBoardDetailTask({ payload: action.payload.id });
    yield put(actions.createCardSuccess());
  } else {
    yield put(actions.createCardFailed(error.data));
  }
}

function createCardAPI(payload) {
  return createCard(payload);
}

export default function* defaultSaga() {
  yield all([
    fork(getBoardDetailWatcher),
    fork(getBoardInfoWatcher),
    fork(createCardWatcher),
  ]);
}
