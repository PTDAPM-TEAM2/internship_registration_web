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
import TCGV from './components/TeacherRole/pages/TrangChuGiangVien';
import Variables from './utils/variables';
import TTCN from './components/TeacherRole/pages/ThongTinCaNhan';
import Sidebar from './components/Sidebar'
import DSSVYC from './components/TeacherRole/pages/DanhSachSVYeuCau';
import DSSV from './components/TeacherRole/pages/DanhSachSV';
import ProjectListStudents from './components/TeacherRole/pages/DanhSachDoAn';
import SRequirementDetails from './components/TeacherRole/pages/DanhSachSVYeuCau/DanhSachYCChiTiet';
import SInformationDetails from './components/TeacherRole/pages/DanhSachSV/DanhSachSVChiTiet';
import PInformationDetails from './components/TeacherRole/pages/DanhSachDoAn/DanhSachDAChiTiet';
import ProcessEvaluation from './components/TeacherRole/pages/DanhSachDoAn/DanhSachDAChiTiet/DanhGiaTienTrinh';
import PasswordChanging from './components/TeacherRole/pages/ThongTinCaNhan/DoiMatKhau';
import Loading from './components/Loading/Loading.js'
import { useContext } from 'react';
import { ThemeContext } from './components/Theme/Theme.jsx';
import { PrivateWrapper } from './Route/route.js';
import SVDA from './components/StudentRole/SVDA';
import SVTT from './components/StudentRole/SVTT';
import TTSV from './components/StudentRole/SVDA/DoAnSV/ThongTinCN';
import DC from './components/StudentRole/SVDA/DoAnSV/DeCuong';
import TTDA from './components/StudentRole/SVDA/DoAnSV/ThongTinDA';
import TDMK from './components/StudentRole/SVDA/DoAnSV/ThayDoiMatKhau';
import TTSVTT from './components/StudentRole/SVTT/ThucTapSV/TTCN';
import TDMKTT from './components/StudentRole/SVTT/ThucTapSV/ThayDoiMatKhau';
import TTTT from './components/StudentRole/SVTT/ThucTapSV/ThongTinTT';
import DKTT from './components/StudentRole/SVTT/ThucTapSV/DangKyTT';
import DKDA from './components/StudentRole/SVDA/DoAnSV/DangKyDA';
function App() {
  // const [loading, setLoading] = React.useState(false);

  // React.useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  // }, []);

  const context = useContext(ThemeContext);
  return (
    <div className="App">
      {/* {loading && <Loading />} */}
      {
        // Toán tử 3 ngôi
        Variables.userRole === 'admin' ?
          // admin role
          (<Router>
            <Routes>
              <Route path="/" element={<Navigate replace to="/dang-nhap" />} />
              <Route path='/dang-nhap' element={<Login />} />
              <Route element={<PrivateWrapper auth={{ isAuthenticated: context.auth }} />}>
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
                  <Route path='trang-chu-giang-vien' element={<TCGV />}></Route >
                </Route >
              </Route>
              <Route path='/ThemGV-da' element={<ThemGV />} />
              <Route path='/them-sinh-vien-da' element={<ThemSV />} />
              <Route path='/chi-tiet-sinh-vien-da/:id' element={<CTSV />} />
              <Route path='/ChiTietGV-da' element={<CTGV />} />
              <Route path='/ChiTietCT-tt' element={<CTCT />} />
              <Route path='/ChiTietXD' element={<CTXD />} />
            </Routes>
          </Router>)
          :
          // nếu không phải admin role thì trả vè teachers rol
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
                  <Route path='danh-sach-do-an-sinh-vien/danh-sach-do-an-chi-tiet/danh-gia-tien-trinh' element={<ProcessEvaluation />}></Route>
                  <Route path='thong-tin-ca-nhan/doi-mat-khau' element={<PasswordChanging />}></Route>
                </Route>
              </Routes>
            </Router>
          ) :
            // students role
            <Router>
              <Routes>
                <Route path="/" element={<Navigate replace to="/dang-nhap" />} />
                <Route path='/dang-nhap' element={<Login />} />
                <Route path='/' element={<Layout />}>
                  {/* Main screen */}
                    <Route path='sinh-vien-do-an' element={<SVDA />}></Route>
                    <Route path='sinh-vien-thuc-tap' element={<SVTT />}></Route>
                  {/* Chuyen huong do an sinh vien */}
                    <Route path='sinh-vien-do-an/thong-tin-sinh-vien' element={<TTSV />}></Route>
                    <Route path='sinh-vien-do-an/thong-tin-sinh-vien/thay-doi-mat-khau' element={<TDMK />}></Route>
                    <Route path='sinh-vien-do-an/dang-ky-do-an' element={<DKDA />}></Route>
                    <Route path='sinh-vien-do-an/nop-de-cuong' element={<DC />}></Route>
                    <Route path='sinh-vien-do-an/thong-tin-do-an' element={<TTDA />}></Route>
                  {/* Chuyen huong thuc tap sinh vien */}
                    <Route path='sinh-vien-thuc-tap/thong-tin-sinh-vien' element={<TTSVTT />}></Route>
                    <Route path='sinh-vien-thuc-tap/thong-tin-sinh-vien/thay-doi-mat-khau' element={<TDMKTT />}></Route>
                    <Route path='sinh-vien-thuc-tap/dang-ky-thuc-tap' element={<DKTT />}></Route>
                    <Route path='sinh-vien-thuc-tap/thong-tin-thuc-tap' element={<TTTT />}></Route>
                  </ Route>
              </ Routes>
            </Router>
      }
    </div>
  );
}

export default App;
