import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from './Information.module.css';
import Sidebar from '../../../Sidebar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '../../../../api/authApi';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import Variables from '../../../../utils/variables';

var initialValues = {
    id: null,
    placeOfBitrh: null,
    fullName: null,
    email: null,
    dateOfBirth: null,
    address: null,
    userType: null,
    firstName: null,
    lastName: null,
    gender: null,
    phoneNumber: null,
    urlImg: null,
    lecturersCode: null,
    numGrTh: null,
    idNumber: null,
}

const TTCN = () => {
    const [imageFile, setImageFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const context = useContext(ThemeContext);


    // Use useEffect hook to fetch data when the component mounts
    useEffect(() => {
      // Define an async function that calls the API
      const fetchData = async () => {
        try {
          // Make a GET request with Axios
          const response = await userApi.getInfo(token);
          // Store the response data in the state variable
          response.dateOfBirth = new Date(response.dateOfBirth).toLocaleDateString()

          initialValues = {
            id: response?.id,
            placeOfBitrh: response?.placeOfBitrh,
            fullName: response?.fullName,
            email: response?.email,
            dateOfBirth: response?.dateOfBirth,
            address: response?.address,
            userType: response?.userType,
            firstName: response?.firstName,
            lastName: response?.lastName,
            gender: response?.gender,
            phoneNumber: response?.phoneNumber,
            urlImg: response?.urlImg,
            lecturersCode: response?.lecturersCode,
            numGrTh: response?.numGrTh,
            idNumber: response?.idNumber,
          } 
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
        navigate('doi-mat-khau', {state: {item}})
    }
    return (
        <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}><b>Thông tin cá nhân</b></p>
                    <div className={styles.container}> 
                        <form>
                            <div>
                            <div className={styles.formAccount} columns={{ lg: 4 }}>
                                    <div className={styles.infoImg} >
                                        {<div className={styles.txt}>
                                            {(imageFile === null) &&
                                                <div>
                                                    <img className={styles.userProfile} src={initialValues.urlImg} alt="" />
                                                    <input
                                                        className={styles.fileInput}
                                                        name='image'
                                                        id='image'
                                                        type="file"
                                                        accept=".jpg, .jpeg, .png"
                                                    />
                                                </div>
                                            }
                                            {
                                                imageFile &&
                                                <div className={styles.image}>
                                                    <img src={imageUrl} alt='avatar' style={{ maxWidth: '100%' }} />
                                                </div>
                                            }
                                        </div>}
                                        <div className={styles.txt}>
                                            <label htmlFor="gender">Giới tính: </label>
                                            <TextField
                                                className={styles.txtGender}
                                                defaultValue={initialValues.gender}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.inputValue}>
                                        <div className={styles.txt} >
                                            <label htmlFor='name'>Họ và tên: </label>
                                            <TextField
                                                className={styles.txtField}
                                                defaultValue={initialValues.fullName}
                                                disabled
                                            />
                                        </div>
                                        <div className={styles.txt} >
                                            <label htmlFor='idCard'>Căn cước: </label>
                                            <TextField
                                                className={styles.txtField}
                                                disabled
                                                defaultValue={initialValues.idNumber}
                                            />
                                        </div>
                                        <div className={styles.txt}>
                                            <label htmlFor='dob'>Ngày sinh: </label>
                                            <TextField
                                                className={styles.txtField}
                                                disabled
                                                defaultValue={initialValues.dateOfBirth}
                                            />
                                        </div>
                                        <div className={styles.txt}>
                                            <label htmlFor='pob'>Nơi sinh: </label>
                                            <TextField
                                                className={styles.txtField}
                                                disabled
                                                defaultValue={initialValues.placeOfBitrh}
                                            />
                                        </div>
                                        <div className={styles.txt}>
                                            <label htmlFor='phone'>Số điện thoại: </label>
                                            <TextField
                                                className={styles.txtField}
                                                defaultValue={initialValues.phoneNumber}
                                                disabled
                                            />
                                        </div>
                                        <div className={styles.txt}>
                                            <label htmlFor='email'>Email: </label>
                                            <TextField
                                                className={styles.txtField}
                                                disabled
                                                defaultValue={initialValues.email}
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={styles.infoAccount}>
                                    <div className={styles.txt}>
                                        <p>Mã giáo viên: </p>
                                        <TextField className={styles.txtTextBottom} defaultValue={initialValues.lecturersCode} disabled/>
                                    </div>
                                    <div className={styles.txt}>
                                        <p>Mật khẩu: </p>
                                        <TextField className={styles.txtTextBottom} defaultValue={Variables.pw} type='password' disabled/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.btn}>
                                <button className={styles.button} onClick= {() => {toComponent(data)}}>Đổi mật khẩu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default TTCN;