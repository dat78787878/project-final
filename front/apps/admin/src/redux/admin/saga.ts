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

function* fetchHotelDetail(action: any): any {
  try {
    const res = yield call(API.fetchHotelDetail, action.payload);
    if (!res.data.success) {
      throw new Error(res.data.errors[0]);
    }
  
    yield put(
      ACTIONS.fetchHotelDetailSuccess(
        res?.data.detailHotel
      )
    );
  } catch (error) {
    yield put(ACTIONS.fetchHotelDetailFailed(error));
  }
}


function* fetchComment(action: any): any {
  try {
    const res = yield call(API.fetchComment, action.payload);
    if (!res.data.success) {
      throw new Error(res.data.errors[0]);
    }
    console.log("res",res)
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

function* createHotel(action: any): any {
  try {
    const res = yield call(API.createHotel);
    if (!res.data.success) {
      throw res.data.errors;
    }
    yield put(ACTIONS.createHotelSuccess(res.data));
    toast.success('Success', { autoClose: 2000 });
  } catch (error: any) {
    yield put(ACTIONS.createHotelFailed(error?.message));
    toast.error(error, { autoClose: 2000 });
  }
}

function* createAnalys(action: any): any {
  try {
    const res = yield call(API.createAnalys);
    if (!res.data.success) {
      throw res.data.errors;
    }
    yield put(ACTIONS.createAnalysSuccess(res.data));
    toast.success('Success', { autoClose: 2000 });
  } catch (error: any) {
    yield put(ACTIONS.createAnalysFailed(error?.message));
    toast.error(error, { autoClose: 2000 });
  }
}

function* fetchReport(action: any): any {
  try {
    const res = yield call(API.fetchReport, action.payload);
    if (!res.data.success) {
      throw new Error(res.data.errors[0]);
    }
    
    yield put(
      ACTIONS.fetchReportSuccess({
        listHotel: res?.data.listHotel,
      })
    );
  } catch (error) {
    yield put(ACTIONS.fetchReportFailed(error));
  }
}


function* fetchStatistical(): any {
  try {

    const res = yield call(API.fetchStatistical);
    if (!res.data.success) {
      throw new Error(res.data.errors[0]);
    }
    console.log("res",res)
    yield put(
      ACTIONS.fetchStatisticalSuccess({
        pieData: res.data.data,
      })
    );
  } catch (error) {
    yield put(ACTIONS.fetchStatisticalFailed(error));
  }
}





export default function* rootSaga() {
  yield all([
    takeEvery(TYPES.FETCH_REPORT, fetchReport),
    takeEvery(TYPES.FETCH_HOTELS, fetchHotels),
    takeEvery(TYPES.FETCH_COMMENT, fetchComment),
    takeEvery(TYPES.CREATE_HOTELS, createHotel),
    takeEvery(TYPES.CREATE_ANALYS, createAnalys),
    takeEvery(TYPES.FETCH_HOTEL_DETAIL,fetchHotelDetail),
    takeEvery(TYPES.FETCH_STATISTICAL,fetchStatistical)
  ]);
}
