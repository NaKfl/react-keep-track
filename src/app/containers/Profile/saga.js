import { getProfile, editProfile } from 'fetchers/profileFetcher';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';

function getProfileAPI(payload) {
  return getProfile(payload);
}

function* getProfileWatcher() {
  yield takeLatest(actions.getProfile, getProfileTask);
}

function* getProfileTask(action) {
  const { response, error } = yield call(getProfileAPI, action.payload);
  if (response) {
    yield put(actions.getProfileSuccess(response.result));
  } else {
    yield put(actions.getProfileFailed(error.data));
  }
}

function editProfileAPI(payload) {
  return editProfile(payload);
}

function* editProfileWatcher() {
  yield takeLatest(actions.editProfile, editProfileTask);
}

function* editProfileTask(action) {
  const { response, error } = yield call(editProfileAPI, action.payload);
  if (response) {
    yield put(actions.editProfileSuccess(response.result));
  } else {
    yield put(actions.editProfileFailed(error.data));
  }
}

export default function* defaultSaga() {
  yield all([fork(getProfileWatcher), fork(editProfileWatcher)]);
}
