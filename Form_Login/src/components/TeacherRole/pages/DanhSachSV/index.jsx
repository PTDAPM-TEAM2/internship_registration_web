import * as React from 'react';
import styles from '../DanhSachSV/StudentList.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx'
import teacherRoleController from '../../controller/TeacherRoleController';
const body = {
  'isAccept' : 2,
  'lecturerId' : null
}
const DSSV = () => {
    // Declare a state variable for data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const context = useContext(ThemeContext);
    // Use useEffect hook to fetch data when the component mounts
    useEffect(() => {
      body.lecturerId = teacherRoleController.getCurrentUser(context.token).lecturersCode;
        // Define an async function that calls the API
      const fetchData = async () => {
        try {
          // Make a GET request with Axios
          const response = await teacherRoleController.getAllResearch(body, context.token);
          // Store the response data in the state variable
          setTimeout(() => {
            setData(response);
            setLoading(false);
          }, 200);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      }
      // Invoke the async function
      fetchData();
    }, []); // Pass an empty dependency array to run only once

    console.log(`tvv-dataaaaaaaa1: ${data}`);


  const navigate = useNavigate();
  function toComponent(item) {
    navigate('chi-tiet-sinh-vien', {state:{item}})
  }
    return ( 
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách sinh viên</b></p>
                <div className={styles.container}> 
                    { (loading !== true && data !== undefined) ? (
                      data.map((item, key) => ( 
                      <div className={styles.card} key = {key}> 
                          <div className={styles.cardItem} onClick={() => toComponent(item)}>
                              <img src={item.student.urlImg} alt='https://cdn-icons-png.flaticon.com/512/1111/1111457.png?w=740&t=st=1679374775~exp=1679375375~hmac=1be977e1463f9446ab47a70ecb1b2d9ced9018b4e2016da861fd31f4ee240c61' className={styles.itemImage}/> 
                              <div className={styles.body}> 
                                  <a><b>Họ và tên: </b>{item.student.fullName}</a> 
                                  <p><b>Mã sinh viên: </b>{item.student.studentCode}</p> 
                                  <p><b>Lớp: </b>{item.student.grade.name}</p> 
                                  <p><b>Khoa: </b>{'CNTT'}</p> 
                              </div> 
                          </div>
                      </div> 
                    )
                    )
                   ) : (<CircularProgress color="success" className={styles.circularProgressIndicator}/>) 
                  } 
                </div> 
            </div>
        </div>
    ); 
};

export default DSSV;
