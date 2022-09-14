import { RouteType } from '../types/app';
import { adminRoutes } from './admin';

export const routes: Array<RouteType> = [
  ...adminRoutes
];
