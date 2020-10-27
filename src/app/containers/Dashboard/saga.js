import { getBoards } from 'fetchers/dashboardFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function getBoardsAPI() {
  return getBoards();
}

function* getBoardsWatcher() {
  yield takeLatest(actions.getBoards, getBoardsTask);
}

function* getBoardsTask() {
  const { response, error } = yield call(getBoardsAPI);
  if (response) {
    yield put(actions.getBoardsSuccess(response.result));
  } else {
    yield put(actions.getBoardsFailed(error.data));
  }
}

export default function* defaultSaga() {
  yield all([fork(getBoardsWatcher)]);
}
