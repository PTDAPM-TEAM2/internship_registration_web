import * as React from 'react';
import styles from '../DanhSachSV/StudentList.module.css';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const DSSV = () => {
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
  }, []); // Pass an empty dependency array to run only once
  const navigate = useNavigate();
  function toComponent(item) {
    navigate('chi-tiet-sinh-vien', {state:{item}})
  }
  console.log(loading);
    return ( 
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách sinh viên</b></p>
                <div className={styles.container}> 
                    { loading === true ? (
                      <CircularProgress color="success" className={styles.circularProgressIndicator}/>) : (
                      data.map((item, key) => ( 
                      <div className={styles.card} key = {key}> 
                          <div className={styles.cardItem} onClick={() => toComponent(item)}>
                              <img src={item.profileImage} alt='' className={styles.itemImage}/> 
                              <div className={styles.body}> 
                                  <a><b>Họ và tên: </b>{item.name}</a> 
                                  <p><b>Mã sinh viên: </b>{item.idsv}</p> 
                                  <p><b>Lớp: </b>{item.sClass}</p> 
                                  <p><b>Khoa: </b>{item.major}</p> 
                              </div> 
                          </div>
                      </div> 
                    )
                    )
                   )
                  } 
                </div> 
            </div>
        </div>
    ); 
};

export default DSSV;
