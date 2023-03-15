import * as React from 'react';
import styles from '../DanhSachSVYeuCau/Requirement.module.css';
// import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import axios from 'axios';
const DSSVYC = () => {
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
    function toComponent (item) {
      navigate('chi-tiet-yeu-cau', {state: {item}})
    }
    return (
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Danh sách sinh viên yêu cầu</b></p>
                <div className={styles.container}> 
                    { loading === true ? (
                      <CircularProgress color="success" className={styles.circularProgressIndicator}/>
                    ) : (data.map((item, key) => ( 
                      <div className={styles.card} key = {key}> 
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
                    )))} 
                </div> 
            </div>
        </div>
    ); 
};

export default DSSVYC;
