import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { login } from 'fetchers/authFetcher';
import { storeAuthInfo, removeAuthInfo } from 'utils/localStorageUtils';

function* loginWatcher() {
  yield takeLatest(actions.login, loginTask);
}

function* loginTask(action) {
  const { response, error } = yield call(loginAPI, action.payload);
  if (response) {
    yield call(storeAuthInfo, response.result);
    yield put(actions.loginSuccess());
  } else {
    yield put(actions.loginFailed(error.data));
  }
}

function loginAPI(payload) {
  return login(payload);
}

function* logoutWatcher() {
  yield takeLatest(actions.logout, logoutTask);
}

function* logoutTask() {
  yield call(removeAuthInfo);
  yield put(actions.logoutSuccess());
}

export default function* defaultSaga() {
  yield all([fork(loginWatcher), fork(logoutWatcher)]);
}
