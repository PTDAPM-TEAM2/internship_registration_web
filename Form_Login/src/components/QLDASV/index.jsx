import React from 'react'
import { useLocation } from 'react-router-dom';
const QLDASV = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>index</div>
  )
}

export default QLDASV