import * as React from 'react';
import styles from '../DoiMatKhau/ChangePassw.module.css';
// import { DataGrid } from '@mui/x-data-grid';
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
import context from 'react-bootstrap/esm/AccordionContext';

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
    };
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Required').test('match', 'Mật khẩu cũ không chính xác!', function (value) {
            return value === this.parent.newPassword;
        }),
        newPassword: Yup.string().min(8, 'Mật khẩu phải có tối thiểu 8 ký tự').required('Required'),
        reNewPassword: Yup.string().min(8, 'Mật khẩu phải có tối thiểu 8 ký tự').oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp!').required('Required'),
    });

    // useEffect(() => {

    //     const fetchData = async () => {
    //         try {
    //           // Make a GET request with Axios
    //           const response = await teacherRoleController.changePassword(initialValues, token);
    //           // Store the response data in the state variable
    //           setMessagePw(response.error);
    //         } catch (error) {
    //           // Handle error
    //           console.error(error);
    //         }
    //       }

    //     fetchData();
    // },[])


    const formik = useFormik({
        initialValues,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await teacherRoleController.changePassword(values, token)
                // setMessagePw(response.error);
            } catch (error) {
                console.log(error.response);
            }
        },
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(true);
        if(Variables.pw !== ""){
            if(formik.values.newPassword === "" || formik.values.oldPassword === "" || formik.values.reNewPassword === ""){
                setErrorMessages("Trường mật khẩu không được bỏ trống!")
    
            }if ((formik.values.newPassword.trim().length < 8 && formik.values.newPassword.trim().length > 0) || (formik.values.reNewPassword.trim().length < 8 && formik.values.reNewPassword.trim().length > 0)){
                setErrorMessages("Mật khẩu phải có tối thiểu 8 ký tự!");
            }else if (formik.values.newPassword !== formik.values.reNewPassword) {
                setErrorMessages("Mật khẩu không trùng khớp!");
            }
            else if(formik.values.oldPassword !== Variables.pw){
                setErrorMessages("Mật khẩu cũ không chính xác!");
            }else{
                setOpen(false);
                setErrorMessages(null);
                setShowAlert(true);
                setShowModal(false);
                setTimeout(() => {
                    navigate('/thong-tin-ca-nhan');
                }, 1000);
            }
        }else{
            setErrorMessages("Mật khẩu cũ không chính xác!");
        }
    }

    initialValues.oldPassword = formik.values.oldPassword
    initialValues.newPassword = formik.values.newPassword
    initialValues.reNewPassword = formik.values.reNewPassword
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
                                    type="password"
                                    onChange={formik.handleChange}
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.reNewPassword}
                                    error={formik.touched.reNewPassword && Boolean(formik.errors.reNewPassword)}
                                />
                            </div>
                            <div className={styles.btnForm}>
                                <div className={styles.btn}>
                                    <button className={styles.button} type="submit" >Cập nhật</button>
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
