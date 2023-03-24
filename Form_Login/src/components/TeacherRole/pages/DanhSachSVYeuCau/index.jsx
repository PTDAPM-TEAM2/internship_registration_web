import * as React from 'react';
import styles from './Requirement.module.css';
// import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import axios from 'axios';
import projectApi from '../../../../api/projectApi';
import userApi from '../../../../api/authApi';
import teacherRoleController from '../../controller/TeacherRoleController';

const body = {
  'isAccept' : 1,
  'lecturerId' : null
}

const DSSVYC = () => {

  
    // Declare a state variable for data
    const [data, setData] = useState([]);
    const location = useLocation()
    const token = localStorage.getItem('token');

    const context = useContext(ThemeContext);
    useEffect(() => {
      body.lecturerId = teacherRoleController.getCurrentUser(token).lecturersCode;
      context.updateLoading(true)
      const fetchData = async () => {
        try {
          // Make a GET request with Axios
          const response = await teacherRoleController.getAllResearch(body, token);
          // Store the response data in the state variable
          setTimeout(() => {
            setData(response);
            context.updateLoading(false)
          }, 1000);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      }
      // Invoke the async function
      fetchData();
    }, []); // Pass an empty dependency array to run only once

    const navigate = useNavigate();
    function toComponent (item) {
      navigate('chi-tiet-yeu-cau', {state: {item}})
    }
    return (
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách sinh viên yêu cầu</b></p>
                <div className={styles.container}> 
                    { data?.map((item, key) =>  
                          <div className={styles.card} key = {key}> 
                            <div className={styles.cardItem} onClick={() => {toComponent(item)}}>
                                <img src={item.student?.urlImg} alt='' className={styles.itemImage}/> 
                                <div className={styles.body}> 
                                    <a><b>Họ và tên: </b>{item.student?.fullName}</a> 
                                    <p><b>Mã sinh viên: </b>{item.student?.id}</p> 
                                    <p><b>Lớp: </b>{item.student?.grade?.name}</p> 
                                    <p><b>Khoa: </b>CNTT</p> 
                                </div> 
                            </div>
                        </div>
                    )
                    } 
                </div> 
            </div>
        </div>
    ); 
};

export default DSSVYC;
