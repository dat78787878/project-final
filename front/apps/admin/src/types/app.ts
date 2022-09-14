import { ReactElement } from 'react';

export type RouteType = {
  path: string;
  element: ReactElement;
  exact: boolean;
  isPublic: boolean;
};

export type TableColumn = {
  name: string | React.ReactNode;
  props?: { [key: string]: string };
};

export type TableData = { [key: string]: string | React.ReactNode };

export type LoginForm = { email: string; password: string };
