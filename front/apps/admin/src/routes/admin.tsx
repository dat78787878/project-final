import { Navigate } from 'react-router-dom';
import Home from '../app/containers/home';
import Comment from '../app/containers/comment';
import DetailHotel from '../app/containers/detail_hotel';
import LayoutWrap from '../app/containers/layout_wrap';
import { RouteType } from '../types/app';

export const adminRoutes: Array<RouteType> = [
  {
    path: '/',
    element: <Navigate to="/admin" />,
    exact: true,
    isPublic: true,
  },
  {
    path: '/admin',
    element: (
      <LayoutWrap>
        <Home />
      </LayoutWrap>
    ),
    exact: true,
    isPublic: true,
  },
  {
    path: '/admin/:id',
    element: (
      <LayoutWrap>
        <DetailHotel />
      </LayoutWrap>
    ),
    exact: true,
    isPublic: true,
  },
  {
    path: '/login',
    element: (
      <LayoutWrap>
        <Home />
      </LayoutWrap>
    ),
    exact: true,
    isPublic: true,
  },
  {
    path: '/list_comment',
    element: (
      <LayoutWrap>
        <Comment />
      </LayoutWrap>
    ),
    exact: true,
    isPublic: true,
  },
];
