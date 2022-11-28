import axiosConn from '../../axiosConn';
import { setQuery } from '../../utils/setQuery';

export const fetchHotels = (form: any) => {
  return axiosConn.get('/api/v1/hotel', {
    params: {
      page: form.page,
      ...setQuery(form.searchForm),
    },
  });
};

export const fetchHotelDetail = (id: any) => {
  return axiosConn.get(`/api/v1/hotel/${id}`);
};

export const fetchComment = (form: any) => {
  return axiosConn.get('/api/v1/comment', {
    params: {
      page: form.page,
      ...setQuery(form.searchForm),
    },
  });
};

export const createHotel = () => {
  return axiosConn.post(`/api/v1/crawlData`);
};


export const createAnalys = () => {
  return axiosConn.post(`/api/v1/analysData`);
};
