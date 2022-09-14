import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as TYPES from './constants';
import * as API from './api';
import * as ACTIONS from './action';
import { toast } from 'react-toastify';

function* fetchHotels(action: any): any {
  try {
    const res = yield call(API.fetchHotels, action.payload);
    if (!res.data.success) {
      throw new Error(res.data.errors[0]);
    }

    yield put(
      ACTIONS.fetchHotelsSuccess({
        hotels: res?.data.hotels,
        totalPage: res?.data.total_pages,
      })
    );
  } catch (error) {
    yield put(ACTIONS.fetchHotelsFailed(error));
  }
}

function* fetchComment(action: any): any {
  try {
    const res = yield call(API.fetchComment, action.payload);
    if (!res.data.success) {
      throw new Error(res.data.errors[0]);
    }

    yield put(
      ACTIONS.fetchCommentSuccess({
        comments: res?.data.comments,
        totalPage: res?.data.total_pages,
      })
    );
  } catch (error) {
    yield put(ACTIONS.fetchCommentFailed(error));
  }
}


export default function* rootSaga() {
  yield all([
    takeEvery(TYPES.FETCH_HOTELS, fetchHotels),
    takeEvery(TYPES.FETCH_COMMENT, fetchComment),
  ]);
}
