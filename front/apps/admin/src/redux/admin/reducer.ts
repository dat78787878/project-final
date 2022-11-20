import * as TYPES from './constants';

const initState = {
  hotels: [],
  comments: [],
  error: null,
  totalPage: 0,
  loading: false,
  createHotelLoadding: false
};

export default function commentReducer(state: any = initState, action: any) {
  switch (action.type) {
    case TYPES.FETCH_HOTELS: {
      return { ...state, loading: true };
    }
    case TYPES.FETCH_HOTELS_SUCCESS: {
      return {
        ...state,
        hotels: action.payload.hotels,
        error: null,
        totalPage: action.payload.totalPage,
        loading: false,
      };
    }
    case TYPES.FETCH_HOTELS_FAILED: {
      return { ...state, error: action.payload };
    }
    case TYPES.FETCH_COMMENT: {
      return { ...state, loading: true };
    }
    case TYPES.FETCH_COMMENT_SUCCESS: {
      return { ...state,
        comments: action.payload.comments,
        error: null,
        totalPage: action.payload.totalPage,
        loading: false,};
    }
    case TYPES.FETCH_COMMENT_FAILED: {
      return { ...state, error: action.payload };
    }
    case TYPES.CREATE_HOTELS: {
      return { ...state,loading: true,createHotelLoadding:true};
    }

    case TYPES.CREATE_HOTELS_SUCCESS: {
      return {  ...state,
        hotels: action.payload.hotels,
        error: null,
        totalPage: action.payload.totalPage,
        loading: false,
        createHotelLoadding:false
      };
    }

    case TYPES.CREATE_HOTELS_FAILED: {
      return { ...state, error: action.payload,loading: false, createHotelLoadding:true };
    }
    
    case TYPES.CREATE_ANALYS: {
      return { ...state, loading: true };
    }
    case TYPES.CREATE_ANALYS_SUCCESS: {
      return { ...state,
        comments: action.payload.comments,
        error: null,
        totalPage: action.payload.totalPage,
        loading: false,};
    }
    case TYPES.CREATE_ANALYS_FAILED: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
}
