import Login from './components/Login';
import React from 'react'
import QLDASV from './components/QLDASV';
import QLSVTT from './components/QLSVTT';
import QLDA from './components/DoAn/QLDA';
import QLGV from './components/DoAn/QLGV';
import QLSV from './components/DoAn/QLSV';
import DSDA from './components/DoAn/DSDoAn';
import DSSV from './components/DoAn/DSSinhVien';
import DSGV from './components/DoAn/DSGiaoVien';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dang-nhap" />} />
          <Route path='/dang-nhap' element={<Login />} />
          <Route path='/' element={<Layout />}>
            <Route path='quan-ly-do-an-sinh-vien' element={<QLDASV  />} />
            <Route path='quan-ly-do-an' element={<QLDA />} />
            <Route path='quan-ly-giao-vien-da' element={<QLGV />} />
            <Route path='quan-ly-sinh-vien-da' element={<QLSV />} />
            <Route path='quan-ly-sinh-vien-thuc-tap' element={<QLSVTT />} />
          </Route>
          <Route path='/danh-sach-do-an' element={<DSDA />} />
          <Route path='/danh-sach-sinh-vien-da' element={<DSSV />} />
          <Route path='/danh-sach-giao-vien-da' element={<DSGV />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
