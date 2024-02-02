import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PrivateRoute() {
    const auth=useAuth();
    const location=useLocation();
  return (
        auth?.currentUser?<Outlet/>:<Navigate to='/login' state={{from:location}} replace/>
  )
}