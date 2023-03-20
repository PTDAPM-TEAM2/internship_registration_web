import Login from './components/Login';
import React from 'react'
import QLDASV from './components/QLDASV';
import QLTTSV from './components/QLSVTT';
import QLDA from './components/DoAn/QLDA';
import QLGV from './components/DoAn/QLGV';
import QLSV from './components/DoAn/QLSV';
import DSDA from './components/DoAn/DSDoAn';
import DSSVDA from './components/DoAn/DSSinhVien';
import DSGVDA from './components/DoAn/DSGiaoVien';
import QLCT from './components/ThucTap/QLCT';
import QLSVTT from './components/ThucTap/QLSVTT';
import QLGVTT from './components/ThucTap/QLGVTT';
import XDDA from './components/DoAn/XDDoAn';
import CTXD from './components/DoAn/ChiTietXD';
import DLSVDA from './components/DoAn/DLSVDA';
import DLGVDA from './components/DoAn/DLGVDA';
import NDSV from './components/DoAn/NDSV';
import ThemSV from './components/DoAn/ThemSV';
import ThemGV from './components/DoAn/ThemGV';
import CTSV from './components/DoAn/ChiTietSV';
import CTGV from './components/DoAn/ChiTietGV';
import DLCT from './components/ThucTap/DLCT';
import DSCT from './components/ThucTap/DSCongTy';
import CTCT from './components/ThucTap/ChiTietCT';
import DLSVTT from './components/ThucTap/DLSVTT';
import DLGVTT from './components/ThucTap/DLGVTT';
import DSSVTT from './components/ThucTap/DSSinhVien';
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
            <Route path='quan-ly-do-an-sinh-vien' element={<QLDASV />} />
            <Route path='quan-ly-sinh-vien-thuc-tap' element={<QLTTSV />} />
            <Route path='quan-ly-do-an' element={<QLDA />} />
            <Route path='quan-ly-giao-vien-da' element={<QLGV />} />
            <Route path='quan-ly-sinh-vien-da' element={<QLSV />} />
            <Route path='quan-ly-cong-ty' element={<QLCT />} />
            <Route path='quan-ly-sinh-vien-tt' element={<QLSVTT />} />
            <Route path='quan-ly-giao-vien-tt' element={<QLGVTT />} />
            <Route path='quan-ly-do-an/xet-duyet-do-an' element={<XDDA />} />
            <Route path='quan-ly-do-an/danh-sach-do-an' element={<DSDA />} />
            <Route path='quan-ly-sinh-vien-da/danh-sach-sinh-vien-da' element={<DSSVDA />} />
            <Route path='quan-ly-giao-vien-da/danh-sach-giao-vien-da' element={<DSGVDA />} />
            <Route path='quan-ly-sinh-vien-da/du-lieu-sinh-vien-da' element={<DLSVDA />} />
            <Route path='quan-ly-giao-vien-da/du-lieu-giao-vien-da' element={<DLGVDA />} />
            <Route path='quan-ly-do-an/danh-sach-do-an/nhap-diem-sv' element={<NDSV />} />
            <Route path='quan-ly-cong-ty/du-lieu-cong-ty' element={<DLCT />} />
            <Route path='quan-ly-cong-ty/danh-sach-cong-ty' element={<DSCT />} />
            <Route path='quan-ly-sinh-vien-tt/du-lieu-sinh-vien-tt' element={<DLSVTT />} />
            <Route path='quan-ly-giao-vien-tt/du-lieu-giao-vien-tt' element={<DLGVTT />} />
            <Route path='quan-ly-sinh-vien-tt/danh-sach-sinh-vien-tt' element={<DSSVTT />} />
          </Route>
          <Route path='/ThemGV-da' element={<ThemGV />} />
          <Route path='/ThemSV-da' element={<ThemSV />} />
          <Route path='/ChiTietSV-da' element={<CTSV />} />
          <Route path='/ChiTietGV-da' element={<CTGV />} />
          <Route path='/ChiTietCT-tt' element={<CTCT />} />
          <Route path='/ChiTietXD' element={<CTXD />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
