import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from '../ThongTinCaNhan/Information.module.css';
import Sidebar from '../../Sidebar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const TTCN = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const [imageFile, setImageFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [date, setDate] = React.useState(dayjs());
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
    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
    };
    
    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }

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

    

    const teacherProfile = [];
    data.map((value) => {
        if(value !== null){
            teacherProfile.push(value);
        }
    })

    const navigate = useNavigate();

    function toComponent(item) {
        navigate('doi-mat-khau', {state: {item}})
    }
    return (
        <div style={{ display: 'flex' }}>
            {/* <Sidebar /> */}
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}><b>Thông tin cá nhân</b></p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} columns={{ lg: 4 }} >
                            <div className={styles.infoImg} >
                                <div className={styles.txt}>
                                    {(imageFile === null) &&
                                        <div>
                                            <img className={styles.userProfile} src={teacherProfile.length === 0 ? '' : teacherProfile[29]['profileImage']} alt="" />
                                            <input
                                                className={styles.fileInput}
                                                name='image'
                                                id='image'
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleImageFileChange}
                                                value={formik.values.image}
                                            />
                                        </div>
                                    }
                                    {
                                        imageFile &&
                                        <div className={styles.image}>
                                            <img src={imageUrl} alt='avatar' style={{ maxWidth: '100%' }} />
                                        </div>
                                    }
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor="gender">Giới tính: </label>
                                    <TextField
                                        className={styles.txtGender}
                                        id="gender"
                                        name="gender"
                                        defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['gender']}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt} >
                                    <label htmlFor='name'>Họ tên: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id='name'
                                        name='name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['name']}
                                    />
                                </div>
                                {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
                                <div className={styles.txt} >
                                    <label htmlFor='idCard'>Căn cước: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="idCard"
                                        name="idCard"
                                        defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['passport']}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='dob'>Ngày sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="idCard"
                                        name="idCard"
                                        defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['dateOfBirth'].substr(0,5)}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='pob'>Nơi sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="pob"
                                        name="pob"
                                        defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['address']}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='phone'>Số điện thoại: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="phone"
                                        name="phone"
                                        defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['numberPhone']}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='email'>Email: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['email']}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã giáo viên: </p>
                                <TextField className={styles.txtField} defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['id']}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField className={styles.txtField} defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['major']}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField className={styles.txtField} defaultValue={teacherProfile.length === 0 ? '' : teacherProfile[29]['password']}/>
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} disabled={formik.isSubmitting} onClick= {() => {toComponent(teacherProfile[29]['password'])}}>Đổi mật khẩu</button>
                        </div>
                    </form>
                </div>

            </div>
            {
                showAlert &&
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
        </div >
    );
};

export default TTCN;