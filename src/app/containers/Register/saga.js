import { call, put, all, fork, takeLatest } from 'redux-saga/effects';

export default function* defaultSaga() {
  yield all([]);
}