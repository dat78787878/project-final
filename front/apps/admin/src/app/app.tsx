import { Route, Routes, useLocation } from 'react-router-dom';
import { RouteType } from '../types/app';
import { routes } from '../routes';
import PrivateRoute from '@front/private-route';
import { useSelector } from 'react-redux';
import NotMatch from './containers/notMatch';

const publicRoutes: Array<RouteType> = [];

const privateRoutes: Array<RouteType> = [];

routes.forEach((e: RouteType) => {
  e.isPublic ? publicRoutes.push(e) : privateRoutes.push(e);
});

function App() {
  // const isLogin = useSelector((state: any) => state.auth.isLogin);
  const isLogin = true;
  return (
    <Routes>
      {publicRoutes.map((e: RouteType, i: number) => (
        <Route key={i} {...e} />
      ))}
      <Route element={<PrivateRoute isAuth={isLogin} />}>
        {privateRoutes.map((e: RouteType, i: number) => (
          <Route key={i} {...e} />
        ))}
      </Route>
      <Route path="*" element={<NotMatch />}></Route>
    </Routes>
  );
}

export default App;
