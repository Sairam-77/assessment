import { Navigate, Outlet } from "react-router-dom"
const ProtectorRoute = () => {


    const userLoggedIn = localStorage.getItem('user');

    return userLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectorRoute;
