import { getBoards, createBoard, deleteBoard } from 'fetchers/dashboardFetcher';
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

function createBoardAPI(payload) {
  return createBoard(payload);
}

function* createBoardWatcher() {
  yield takeLatest(actions.createBoard, createBoardTask);
}

function* createBoardTask(action) {
  const { response, error } = yield call(createBoardAPI, action.payload);
  if (response) {
    yield put(actions.createBoardSuccess(response.result));
    yield getBoardsTask();
  } else {
    yield put(actions.createBoardFailed(error.data));
  }
}

function deleteBoardAPI(payload) {
  return deleteBoard(payload);
}

function* deleteBoardWatcher() {
  yield takeLatest(actions.deleteBoard, deleteBoardTask);
}

function* deleteBoardTask(action) {
  const { response, error } = yield call(deleteBoardAPI, action.payload);
  if (response) {
    yield put(actions.deleteBoardSuccess(response.result));
    yield getBoardsTask();
  } else {
    yield put(actions.deleteBoardFailed(error.data));
  }
}

export default function* defaultSaga() {
  yield all([
    fork(getBoardsWatcher),
    fork(createBoardWatcher),
    fork(deleteBoardWatcher),
  ]);
}
