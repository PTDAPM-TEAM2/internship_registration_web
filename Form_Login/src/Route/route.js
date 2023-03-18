import React from "react";
import { Outlet } from 'react-router-dom'
import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../components/Theme/Theme.jsx';

const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/dang-nhap" />;
};



export { PrivateWrapper };