import * as React from 'react';


function createData(Hoten, Lop, TenDoAn, Ky, SoCC, NgaySinh, NoiSinh, SDT, email, Ma, Mk, GiangVien, Khoa, gt) {
    return { Hoten, Lop, TenDoAn, Ky, SoCC, NgaySinh, NoiSinh, SDT, email, Ma, Mk, GiangVien, Khoa, gt };
}
class Variables extends React.Component {


    static userRole = "students";

    static studentList = [
        createData('Nguyễn Đức Tâm', '62PM02', 'Quản lý du học sinh Việt Nam', '01/2022-2023', '064202222242', '21/04/2002', 'Gia Lai', '0358074833', 'tam@gmail.com', '2051066666', '********', 'Cù Việt Dũng', 'Công nghệ thông tin', 'Nam'),
        createData('Nguyễn Thị Bích Ngọc', '62PM02', 'Quản lý cửa hàng thú cưng', '01/2022-2023', '064202222241', '17/01/2002', 'Thanh Hóa', '0355037873', 'ngoc@gmail.com', '2051061111', '********', 'Cù Việt Dũng', 'Công nghệ thông tin', 'Nữ'),
        createData('Nguyễn Đức Phong', '62PM02', 'Quản lý nhân sụ công ty ABC', '01/2022-2023', '064202222243', '22/01/2002', 'Hà Nội', '0353534544', 'phong@gmail.com', '2051064444', '********', 'Cù Việt Dũng', 'Công nghệ thông tin', 'Nam'),
    ];

}

export default Variables