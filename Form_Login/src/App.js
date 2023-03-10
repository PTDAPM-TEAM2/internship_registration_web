import Login from './components/Login';
import React from 'react'
import QLDASV from './components/AdminRole/QLDASV';
import QLTTSV from './components/AdminRole/QLSVTT';
import QLDA from './components/AdminRole/DoAn/QLDA';
import QLGV from './components/AdminRole/DoAn/QLGV';
import QLSV from './components/AdminRole/DoAn/QLSV';
import DSDA from './components/AdminRole/DoAn/DSDoAn';
import DSSVDA from './components/AdminRole/DoAn/DSSinhVien';
import DSGVDA from './components/AdminRole/DoAn/DSGiaoVien';
import QLCT from './components/AdminRole/ThucTap/QLCT';
import QLSVTT from './components/AdminRole/ThucTap/QLSVTT';
import QLGVTT from './components/AdminRole/ThucTap/QLGVTT';
import XDDA from './components/AdminRole/DoAn/XDDoAn';
import CTXD from './components/AdminRole/DoAn/ChiTietXD';
import DLSVDA from './components/AdminRole/DoAn/DLSVDA';
import DLGVDA from './components/AdminRole/DoAn/DLGVDA';
import NDSV from './components/AdminRole/DoAn/NDSV';
import ThemSV from './components/AdminRole/DoAn/ThemSV';
import ThemGV from './components/AdminRole/DoAn/ThemGV';
import CTSV from './components/AdminRole/DoAn/ChiTietSV';
import CTGV from './components/AdminRole/DoAn/ChiTietGV';
import DLCT from './components/AdminRole/ThucTap/DLCT';
import DSCT from './components/AdminRole/ThucTap/DSCongTy';
import CTCT from './components/AdminRole/ThucTap/ChiTietCT';
import DLSVTT from './components/AdminRole/ThucTap/DLSVTT';
import DLGVTT from './components/AdminRole/ThucTap/DLGVTT';
import DSSVTT from './components/AdminRole/ThucTap/DSSinhVien';
import DSGVTT from './components/AdminRole/ThucTap/DSGiaoVien';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import TCGV from './components/TeacherRole/TrangChuGiangVien';
import Variables from './utils/variables';
import TTCN from './components/TeacherRole/ThongTinCaNhan';
import Sidebar from './components/Sidebar'
import DSSVYC from './components/TeacherRole/DanhSachSVYeuCau';
import DSSV from './components/TeacherRole/DanhSachSV';
import ProjectListStudents from './components/TeacherRole/DanhSachDoAn';
import SRequirementDetails from './components/TeacherRole/DanhSachSVYeuCau/DanhSachYCChiTiet';
import SInformationDetails from './components/TeacherRole/DanhSachSV/DanhSachSVChiTiet';
import PInformationDetails from './components/TeacherRole/DanhSachDoAn/DanhSachDAChiTiet';

function App() {
  return (
    <div className="App">
      {
        // To??n t??? 3 ng??i
        Variables.userRole === 'admin' ?
          // admin role
          (<Router>
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
                <Route path='quan-ly-giao-vien-tt/danh-sach-giao-vien-tt' element={<DSGVTT />} />
                <Route path='trang-chu-giang-vien' element={<TCGV />}></Route>
              </Route>
              <Route path='/ThemGV-da' element={<ThemGV />} />
              <Route path='/ThemSV-da' element={<ThemSV />} />
              <Route path='/ChiTietSV-da' element={<CTSV />} />
              <Route path='/ChiTietGV-da' element={<CTGV />} />
              <Route path='/ChiTietCT-tt' element={<CTCT />} />
              <Route path='/ChiTietXD' element={<CTXD />} />
            </Routes>
          </Router>)
          :
          // n???u kh??ng ph???i admin role th?? tr??? v?? teachers rol
          // teachers role
          Variables.userRole === 'teachers' ? (
            <Router>
              <Routes>
                <Route path="/" element={<Navigate replace to="/dang-nhap" />} />
                <Route path='/dang-nhap' element={<Login />} />
                <Route path='/' element={<Layout />}>
                  {/* Main screen */}
                  <Route path='trang-chu-giang-vien' element={<TCGV />}></Route>
                  <Route path='thong-tin-ca-nhan' element={<TTCN />}></Route>
                  <Route path='danh-sach-sinh-vien-yeu-cau' element={<DSSVYC />}></Route>
                  <Route path='danh-sach-sinh-vien' element={<DSSV />}></Route>
                  <Route path='danh-sach-do-an-sinh-vien' element={<ProjectListStudents />}></Route>
                  {/* Navigate another screen */}
                  <Route path='danh-sach-sinh-vien-yeu-cau/chi-tiet-yeu-cau' element={<SRequirementDetails />}></Route>
                  <Route path='danh-sach-sinh-vien/chi-tiet-sinh-vien' element={<SInformationDetails />}></Route>
                  <Route path='danh-sach-do-an-sinh-vien/danh-sach-do-an-chi-tiet' element={<PInformationDetails />}></Route>
                </Route>
              </Routes>
            </Router>
          ) :
            // students role
            <Router></Router>
      }
    </div>
  );
}

export default App;
