import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const authenticated = sessionStorage.getItem("ssp");

  return authenticated ? <Outlet /> : <Navigate to='/admin' />;
};

export default AdminProtectedRoutes;
