import { all } from 'redux-saga/effects';
import adminSaga from './admin/saga';

export default function* rootSaga() {
  yield all([
    adminSaga()
  ]);
}
