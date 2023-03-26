import React from "react";
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../components/Theme/Theme';


const PrivateWrapper = () => {
  const context = useContext(ThemeContext);
  console.log(context.auth);
  return context.auth ? <Outlet /> : <Navigate to="/dang-nhap" />;
};



export default PrivateWrapper;