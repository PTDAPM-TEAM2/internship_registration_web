import React from "react";
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/dang-nhap" />;
};



export { PrivateWrapper };