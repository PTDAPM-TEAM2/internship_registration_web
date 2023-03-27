import React from "react";
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../components/Theme/Theme';


const PrivateWrapper = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/dang-nhap" replace />;
};



export default PrivateWrapper;