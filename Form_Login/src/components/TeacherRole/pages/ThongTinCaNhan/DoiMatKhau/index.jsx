import * as React from 'react';
import styles from '../DoiMatKhau/ChangePassw.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import imageLock from '../../../../../images/lock.png';
import warningImage from '../../../../../images/warning.png';
import axios from 'axios';
import teacherRoleController from '../../../controller/TeacherRoleController';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Variables from '../../../../../utils/variables';

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const PasswordChanging = () => {
    const [errorMessages, setErrorMessages] = useState("");
    const token = localStorage.getItem('token');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [messagePw, setMessagePw] = useState("");
    const [data, setData] = useState(false);
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [emptyOldPw, setEmptyOldPw] = useState(false);
    const [emptyNewPw, setEmptyNewPw] = useState(false);
    const [emptyRenewPw, setEmptyRenewPw] = useState(false);


    const initialValues = {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit:  async (values) => {
            try {
                await teacherRoleController.changePassword(values, token)
                setOpen(false);
                setErrorMessages(null);
                setShowAlert(true);
                setEmptyOldPw(false);
                setShowModal(false);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                // setMessagePw(response.error);
                // if()
            } catch (error) {
                console.log(error.response.data.error);
                if((formik.values.newPassword.trim().length >= 1 && formik.values.newPassword.trim().length <= 7)  || (formik.values.oldPassword.trim().length >= 1 && formik.values.oldPassword.trim().length <= 7) || (formik.values.reNewPassword.trim().length >= 1 && formik.values.reNewPassword.trim().length <= 7)){
                    if(formik.values.oldPassword.trim().length < 8){
                        setEmptyOldPw(true)
                    }
                    if(formik.values.newPassword.trim().length < 8){
                        setEmptyNewPw(true)
                    }
                    if(formik.values.reNewPassword.trim().length < 8){
                        setEmptyRenewPw(true)
                    }
                    setErrorMessages("Mật khẩu phải có tối thiểu 8 ký tự!")
                    if((error.response.data.error === "Mật khẩu có tối thiểu 8 ký tự")){
                        setErrorMessages("Mật khẩu phải có tối thiểu 8 ký tự!")
                    }
                }else if(formik.values.newPassword.trim() === "" || formik.values.oldPassword.trim() === "" || formik.values.reNewPassword.trim() === ""){
                    if(formik.values.oldPassword.trim() === ""){
                        setEmptyOldPw(true)
                    }
                    if(formik.values.newPassword.trim() === ""){
                        setEmptyNewPw(true)
                    }
                    if(formik.values.reNewPassword.trim() === ""){
                        setEmptyRenewPw(true)
                    }
                    setErrorMessages("Trường mật khẩu không được bỏ trống!")
                }
                else if(formik.values.newPassword !== formik.values.reNewPassword){
                    setEmptyRenewPw(true)
                    setErrorMessages("Mật khẩu không trùng khớp!")
                    if(error.response.data.error === "Nhập lại mật khẩu mới không khớp"){
                        setErrorMessages("Mật khẩu không trùng khớp!")
                    }
                }else if(error.response.data.error === "Mật khẩu không chính xác"){
                    setEmptyOldPw(true)
                    setErrorMessages("Mật khẩu cũ không chính xác!")
                }else{
                    if(formik.values.oldPassword.trim().length < 8){
                        setEmptyOldPw(true)
                    }
                    if(formik.values.newPassword.trim().length < 8){
                        setEmptyNewPw(true)
                    }
                    if(formik.values.reNewPassword.trim().length < 8){
                        setEmptyRenewPw(true)
                    }
                    setMessagePw("Mật khẩu phải có tối thiểu 8 ký tự!")
                }
                setOpen(true);
            }
        },
    })

    initialValues.oldPassword = formik.values.oldPassword.trim()
    initialValues.newPassword = formik.values.newPassword.trim()
    initialValues.reNewPassword = formik.values.reNewPassword.trim()

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
                                    style = {
                                        emptyOldPw === true ? {'border':'1px solid red', 'borderRadius' : '5px'} : null}
                                    id="oldPassword"
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                    name="oldPassword"
                                    type="password"
                                    onChange={e => {
                                        formik.handleChange(e);
                                        if(e.target.value.length >= 8){
                                            setEmptyOldPw(false);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 32) {
                                          e.preventDefault();
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.oldPassword}
                                    error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                />
                            </div>
                            <label htmlFor='password'><b>Mật khẩu mới:</b></label>
                            <div className={styles.txt}>
                                <TextField
                                    className={styles.txtField}
                                    id="newPassword"
                                    name="newPassword"
                                    style = {emptyNewPw === true ? {'border':'1px solid red', 'borderRadius' : '5px'} : {}}
                                    type="password"
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                    onChange={e => {
                                        formik.handleChange(e);
                                        if(e.target.value.length >= 8){
                                            setEmptyNewPw(false);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 32) {
                                          e.preventDefault();
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.newPassword}
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                />
                            </div>
                            <label htmlFor='password'><b>Nhập lại mật khẩu mới:</b></label>
                            <div className={styles.txt}>
                                <TextField
                                    className={styles.txtField}
                                    id="reNewPassword"
                                    name="reNewPassword"
                                    type="password"
                                    style = {emptyRenewPw === true ? {'border':'1px solid red', 'borderRadius' : '5px'} : {}}
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                    onChange={e => {
                                        formik.handleChange(e);
                                        if(e.target.value.length >= 8){
                                            setEmptyRenewPw(false);
                                        }
                                        if((initialValues.newPassword === initialValues.reNewPassword) && ((initialValues.newPassword.length >= 8) || (initialValues.reNewPassword.length >= 8))){
                                            setEmptyRenewPw(false);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 32) {
                                          e.preventDefault();
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.reNewPassword}
                                    error={formik.touched.reNewPassword && Boolean(formik.errors.reNewPassword)}
                                />
                            </div>
                            <div className={styles.btnForm}>
                                <div className={styles.btn}>
                                    {/* <button className={styles.button} type="submit" onClick={handleSubmit}>Cập nhật</button> */}                                    
                                    <button className={styles.button} type="submit">Cập nhật</button>
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h3" style={{color: 'red', textAlign: 'center', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                            <img src={warningImage} alt="" style={{width: '25px', height: '25px', objectFit: 'cover', marginRight: '20px'}}/>{errorMessages}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                            <Button onClick={handleClose} className = {styles.button}>OK</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
};

export default PasswordChanging;
