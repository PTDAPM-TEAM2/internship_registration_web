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
import imageLock from '../../../../../images/lock.png';

import axios from 'axios';
import Variables from '../../../../../utils/variables';
import teacherRoleController from '../../../controller/TeacherRoleController';

const PasswordChanging = () => {
  const [password, setPassword] = useState("");
  const token = localStorage.getItem('token');
  const location = useLocation()
  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  }

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    reNewPassword: ''
  };
const validation = Yup.object().shape({
    oldPassword: Yup.string().required('Required'),
    newPassword: Yup.string().min(8, 'Mật khẩu phải có tối thiểu 8 ký tự').required('Required'),
    reNewPassword: Yup.string().min(8, 'Mật khẩu phải có tối thiểu 8 ký tự').required('Required'),
});

const formik = useFormik({
    initialValues,
    validation,
    onSubmit: async (values) => {
        try {
            await teacherRoleController.changePassword(values, token)
        } catch (error) {
            console.log(error);
        }
    },
})

function handleGo() {
        setShowAlert(true);
        setTimeout(() => {
            navigate('/thong-tin-ca-nhan');
        }, 1000)
}

initialValues.oldPassword = formik.values.oldPassword
initialValues.newPassword = formik.values.newPassword
initialValues.reNewPassword = formik.values.reNewPassword
console.log(`old-pw ${initialValues.oldPassword}`);
console.log(`new-pw ${initialValues.newPassword}`);
console.log(`confirm-pw ${initialValues.reNewPassword}`);

    // Declare a state variable for data
    return (
        <div className={styles.form}>
            <div style={{ width: '100%' }}>
                <p className={styles.title}><b>Đổi mật khẩu</b></p>
                <form className={styles.container} onSubmit={formik.handleSubmit}> 
                    <div className={styles.content}>
                      <img src={imageLock} alt="" />
                      <div className={styles.formInfor}>
                        <label htmlFor='password'><b>Mật khẩu cũ:</b></label>
                        <div className={styles.txt}>
                            <TextField
                                className={styles.txtField}
                                id="oldPassword"
                                name="oldPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.oldPassword}
                            />
                        </div>
                        <label htmlFor='password'><b>Mật khẩu mới:</b></label>
                        <div className={styles.txt}>
                            <TextField
                                className={styles.txtField}
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.newPassword}
                            />
                        </div>
                        <label htmlFor='password'><b>Nhập lại mật khẩu mới:</b></label>
                        <div className={styles.txt}>
                            <TextField
                                className={styles.txtField}
                                id="reNewPassword"
                                name="reNewPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur = {formik.handleBlur}
                                value = {formik.values.reNewPassword}
                            />
                        </div>
                      <div className={styles.btnForm}>
                          <div className={styles.btn}>
                              <button className={styles.button} disabled={formik.isSubmitting} onClick={() => handleGo()}>Cập nhật</button>
                          </div>
                      </div>
                      </div>
                    </div>
                </form> 
                    {showAlert &&
                        <div>
                            <Alert severity="success" sx={{
                                position: 'absolute',
                                width: '40%',
                                bottom: '0',
                                right: '2%'
                            }}>
                                <AlertTitle>Đổi mật khẩu thành công</AlertTitle>
                            </Alert>
                        </div>
                    }
            </div>
        </div>
    ); 
};

export default PasswordChanging;
