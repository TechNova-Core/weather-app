import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRoute = ({ isAuthenticated }) => {
    const location = useLocation();
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to={`/signin?url=${location.pathname}`} />;
}

export default AuthRoute;