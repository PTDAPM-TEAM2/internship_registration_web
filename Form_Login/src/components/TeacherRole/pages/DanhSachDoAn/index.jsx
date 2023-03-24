import * as React from 'react';
import styles from './ProjectList.module.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import teacherRoleController from '../../controller/TeacherRoleController';

const body = {
  'isAccept' : 2,
  'lecturerId' : null
}

const ProjectListStudents = () => {
  // Declare a state variable for data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const context = useContext(ThemeContext);
  const [date, setDate] = useState(null);
    // Use useEffect hook to fetch data when the component mounts
    useEffect(() => {
      body.lecturerId = teacherRoleController.getCurrentUser(token).lecturersCode;
        // Define an async function that calls the API
      const fetchData = async () => {
        context.updateLoading(true)
        try {
          // Make a GET request with Axios
          const response = await teacherRoleController.getAllResearch(body, token);
          // Store the response data in the state variable
          setTimeout(() => {
            setData(response);
            context.updateLoading(false);
          }, 1000);
        } catch (error) {
          // Handle error
          console.error(error);
        }
      }
      // Invoke the async function
      fetchData();
    }, []); // Pass an empty dependency array to run only once
    data.map((e) => {
      e.submitDay = new Date(e.submitDay).toLocaleDateString()
    })
    const navigate = useNavigate();
    function toComponent(item) {
      navigate('danh-sach-do-an-chi-tiet', {state: {item}})
    }
    return ( 
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách đồ án</b></p>
                <div className={styles.container}> 
                    {
                        data?.map((item, key) => (     
                          <div className={styles.card} key={key}> 
                            <a className={styles.cardItem} onClick={() => {toComponent(item)}}>
                                <div className={styles.body}> 
                                    <a><b>Đề tài: {item?.nameGraduationThesis}</b></a><br></br>
                                    <a><b>Tên sinh viên: </b>{item.student?.fullName}</a> 
                                    <p><b>Mã sinh viên: </b>{item.student?.studentCode}</p> 
                                    <p><b>Ngày nộp: </b>{item.submitDay}</p> 
                                </div> 
                            </a>
                          </div>
                        )
                      )
                    }
                </div> 
            </div>
        </div>
    ); 
};

export default ProjectListStudents;
