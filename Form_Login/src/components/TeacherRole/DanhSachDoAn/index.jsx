import * as React from 'react';
import styles from '../DanhSachDoAn/ProjectList.module.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
const ProjectListStudents = () => {
  // Declare a state variable for data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

    // Use useEffect hook to fetch data when the component mounts
  useEffect(() => {
      // Define an async function that calls the API
    async function fetchData() {
      try {
        // Make a GET request with Axios
        const response = await axios.get("https://641028d1864814e5b648f368.mockapi.io/students");
        // Store the response data in the state variable
        setTimeout(() => {
          setData(response.data);
          setLoading(false)
        }, 200);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    // Invoke the async function
    fetchData();
  }, []); // Pas
    const navigate = useNavigate();
    function toComponent(item) {
      navigate('danh-sach-do-an-chi-tiet', {state: {item}})
    }
    return ( 
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách đồ án</b></p>
                <div className={styles.container}> 
                    { loading === true ? (
                      <CircularProgress color="success" className={styles.circularProgressIndicator}/>
                    ) : (data.map((item) => ( 
                    <div className={styles.card}> 
                        <a className={styles.cardItem} onClick={() => {toComponent(item)}}>
                            <div className={styles.body}> 
                                <a><b>Đề tài: {item.topic}</b></a><br></br>
                                <a><b>Tên sinh viên: </b>{item.name}</a> 
                                <p><b>Mã sinh viên: </b>{item.idsv}</p> 
                                <p><b>Ngày nộp: </b>{item.dateSubmitted.substr(0,10)}</p> 
                            </div> 
                        </a>
                    </div> 
                    )))} 
                </div> 
            </div>
        </div>
    ); 
};

export default ProjectListStudents;
