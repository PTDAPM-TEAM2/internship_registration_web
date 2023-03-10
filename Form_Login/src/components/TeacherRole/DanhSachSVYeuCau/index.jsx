import * as React from 'react';
import styles from '../DanhSachSVYeuCau/Requirement.module.css';
// import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import {Link, useNavigate} from 'react-router-dom';

const data = [
  {
    id: 1,
    image: "https://picsum.photos/200",
    name: "Hà Lan Anh",
    msv: "2051063222",
    sClass: "62PM3",
    major: "CNTT",
    gender: "Nam",
    phoneNumber:"0868273123",
    dateOfBirth:"03/04/2002",
    passport:"0102300424",
    address: "Hà Nội",
    email: "cchut@gmail.com",
    idMonitor:"A00",
    password: "*******",
    topic: "Quản lý bãi đỗ xe"
  },
  {
    id: 2,
    image: "https://picsum.photos/200",
    name: "Hà Lan Anh",
    msv: "2051063222",
    sClass: "62PM3",
    major: "CNTT",
    gender: "Nam",
    phoneNumber:"0868273123",
    dateOfBirth:"03/04/2002",
    passport:"0102300424",
    address: "Hà Nội",
    email: "cchut@gmail.com",
    idMonitor:"A00",
    password: "*******",
    topic: "Quản lý bãi đỗ xe"
  },
  {
    id: 3,
    image: "https://picsum.photos/200",
    name: "Hà Lan Anh",
    msv: "2051063222",
    sClass: "62PM3",
    major: "CNTT",
    gender: "Nam",
    phoneNumber:"0868273123",
    dateOfBirth:"03/04/2002",
    passport:"0102300424",
    address: "Hà Nội",
    email: "cchut@gmail.com",
    idMonitor:"A00",
    password: "*******",
    topic: "Quản lý bãi đỗ xe"
  },
  {
    id: 4,
    image: "https://picsum.photos/200",
    name: "Hà Lan Anh",
    msv: "2051063222",
    sClass: "62PM3",
    major: "CNTT",
    gender: "Nam",
    phoneNumber:"0868273123",
    dateOfBirth:"03/04/2002",
    passport:"0102300424",
    address: "Hà Nội",
    email: "cchut@gmail.com",
    idMonitor:"A00",
    password: "*******",
    topic: "Quản lý bãi đỗ xe"
  },
  {
    id: 5,
    image: "https://picsum.photos/200",
    name: "Hà Lan Anh",
    msv: "2051063222",
    sClass: "62PM3",
    major: "CNTT",
    gender: "Nam",
    phoneNumber:"0868273123",
    dateOfBirth:"03/04/2002",
    passport:"0102300424",
    address: "Hà Nội",
    email: "cchut@gmail.com",
    idMonitor:"A00",
    password: "*******",
    topic: "Quản lý bãi đỗ xe"
  },
  {
    id: 6,
    image: "https://picsum.photos/200",
    name: "Tạ Văn Vinh",
    msv: "2051063222",
    sClass: "62PM3",
    major: "CNTT",
    gender: "Nam",
    phoneNumber:"0863128273",
    dateOfBirth:"03/04/2002",
    passport:"0230041024",
    address: "Hà Nội",
    email: "cutch@gmail.com",
    idMonitor:"A00",
    password: "*******",
    topic: "Quản lý thực phẩm ăn nhanh"
  },
];
const DSSVYC = () => {
    const navigate = useNavigate();
    function toComponent (item) {
      navigate('chi-tiet-yeu-cau', {state: {item}})
    }
    return (
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách sinh viên yêu cầu</b></p>
                <div className={styles.container}> 
                    {data.map((item, index) => ( 
                      <div className={styles.card} key={index}> 
                          <div className={styles.cardItem} onClick={() => {toComponent(item)}}>
                              <img src={item.image} alt='' className={styles.itemImage}/> 
                              <div className={styles.body}> 
                                  <a><b>Họ và tên: </b>{item.name}</a> 
                                  <p><b>Mã sinh viên: </b>{item.id}</p> 
                                  <p><b>Lớp: </b>{item.sClass}</p> 
                                  <p><b>Khoa: </b>{item.major}</p> 
                              </div> 
                          </div>
                      </div>
                    ))} 
                </div> 
            </div>
        </div>
    ); 
};

export default DSSVYC;
