import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { register } from 'fetchers/authFetcher';
import { storeAuthInfo, removeAuthInfo } from 'utils/localStorageUtils';

function* registerWatcher() {
  yield takeLatest(actions.register, registerTask);
}

function* registerTask(action) {
  const { response, error } = yield call(registerAPI, action.payload);
  if (response) {
    yield put(actions.registerSuccess());
  } else {
    yield put(actions.registerFailed(error.data));
  }
}

function registerAPI(payload) {
  return register(payload);
}

export default function* defaultSaga() {
  yield all([fork(registerWatcher)]);
}
