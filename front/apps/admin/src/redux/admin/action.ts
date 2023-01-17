import * as TYPES from './constants';

export const fetchHotels = (page: number, searchForm: any) => ({
  type: TYPES.FETCH_HOTELS,
  payload: { page, searchForm },
});

export const fetchHotelsSuccess = (data: any) => ({
  type: TYPES.FETCH_HOTELS_SUCCESS,
  payload: data,
});

export const fetchHotelsFailed = (error: any) => ({
  type: TYPES.FETCH_HOTELS_FAILED,
  payload: error,
});

export const fetchHotelDetail = (id:any) => ({
  type: TYPES.FETCH_HOTEL_DETAIL,
  payload: id,
});

export const fetchHotelDetailSuccess = (data: any) => ({
  type: TYPES.FETCH_HOTEL_DETAIL_SUCCESS,
  payload: data,
});

export const fetchHotelDetailFailed = (error: any) => ({
  type: TYPES.FETCH_HOTEL_DETAIL_FAILED,
  payload: error,
});


export const fetchComment = (page: number, searchForm: any) => ({
  type: TYPES.FETCH_COMMENT,
  payload: { page, searchForm },
});


export const fetchCommentSuccess = (data: any) => ({
  type: TYPES.FETCH_COMMENT_SUCCESS,
  payload: data,
});

export const fetchCommentFailed = (error: any) => ({
  type: TYPES.FETCH_COMMENT_FAILED,
  payload: error,
});



export const createHotel = () => ({
  type: TYPES.CREATE_HOTELS,
 
});

export const createHotelSuccess = (data: any) => ({
  type: TYPES.CREATE_HOTELS_SUCCESS,
  payload: data,
});

export const createHotelFailed = (error: any) => ({
  type: TYPES.CREATE_HOTELS_FAILED,
  payload: error,
});



export const createAnalys = () => ({
  type: TYPES.CREATE_ANALYS,
 
});

export const createAnalysSuccess = (data: any) => ({
  type: TYPES.CREATE_ANALYS_SUCCESS,
  payload: data,
});

export const createAnalysFailed = (error: any) => ({
  type: TYPES.CREATE_ANALYS_FAILED,
  payload: error,
});



export const fetchReport = (topic: any) => ({
  type: TYPES.FETCH_REPORT,
  payload: topic ,
});


export const fetchReportSuccess = (data: any) => ({
  type: TYPES.FETCH_REPORT_SUCCESS,
  payload: data,
});

export const fetchReportFailed = (error: any) => ({
  type: TYPES.FETCH_REPORT_FAILED,
  payload: error,
});


export const fetchStatistical = () => ({
  type: TYPES.FETCH_STATISTICAL
});


export const fetchStatisticalSuccess = (data: any) => ({
  type: TYPES.FETCH_STATISTICAL_SUCCESS,
  payload: data,
});

export const fetchStatisticalFailed = (error: any) => ({
  type: TYPES.FETCH_STATISTICAL_FAILED,
  payload: error,
});



