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


