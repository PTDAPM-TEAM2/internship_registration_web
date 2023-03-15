import * as React from 'react';
import styles from '../DoiMatKhau/ChangePassw.module.css';
// import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { TextField } from '@mui/material';
import imageLock from '../../../../images/lock.png';

import axios from 'axios';
const PasswordChanging = () => {
  const [password, setPassword] = useState("");

  const location = useLocation()
  const state = location.state;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }

  console.log(state.item.password);

  const initialValues = {
      image: '',
      name: '',
      gender: '',
      idCard: '',
      dob: '',
      pob: '',
      phone: '',
      email: '',
  };
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
const validation = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string()
        .matches(emailRegex, "Invalid email address")
        .required("Required"),
    gender: Yup.string().required('Required'),
    idCard: Yup.string()
        .matches(/^[A-Z]{2}\d{7}$/, "Invalid identity card format")
        .required("Required"),
    dob: Yup.string().required('Required'),
    pob: Yup.string().required('Required'),
    phone: Yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required")

});

const formik = useFormik({
    initialValues,
    validation,
    onSubmit: handleSubmit,
})

    // Declare a state variable for data
    return (
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Đổi mật khẩu</b></p>
                <div className={styles.container}> 
                    <div className={styles.content}>
                      <img src={imageLock} alt="" />
                      <div className={styles.formInfor}>
                        <label htmlFor='password'><b>Mật khẩu cũ:</b></label>
                        <div className={styles.txt}>
                            <TextField
                                className={styles.txtField}
                                id="oldPassword"
                                name="password"
                                type="password"
                                onChange={password}
                                defaultValue={state.item.password}
                            />
                        </div>
                        <label htmlFor='password'><b>Mật khẩu mới:</b></label>
                        <div className={styles.txt}>
                            <TextField
                                className={styles.txtField}
                                id="newPassword"
                                name="password"
                                type="password"
                                onChange={password}
                            />
                        </div>
                        <label htmlFor='password'><b>Nhập lại mật khẩu mới:</b></label>
                        <div className={styles.txt}>
                            <TextField
                                className={styles.txtField}
                                id="rePassword"
                                name="password"
                                type="password"
                                onChange={password}
                            />
                        </div>
                      <div className={styles.btnForm}>
                          <div className={styles.btn}>
                              <button className={styles.button} disabled={formik.isSubmitting} onClick={() => {}}>Cập nhật</button>
                          </div>
                      </div>
                      </div>
                    </div>
                </div> 
            </div>
        </div>
    ); 
};

export default PasswordChanging;
