import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ isAuth }: any) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
