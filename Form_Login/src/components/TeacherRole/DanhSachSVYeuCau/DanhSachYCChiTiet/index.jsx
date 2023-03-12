import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from './StudentDetails.module.css';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
const SRequirementDetails = () => {
    const location = useLocation()
    const state = location.state;
    console.log(`aaa ${state.item.name}`);
    const [showAlert, setShowAlert] = React.useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [date, setDate] = React.useState(dayjs());

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

    // const {item} = props.location.state;
    // console.log(item);

    return (
        <div style={{ display: 'flex' }}>
            {/* <Sidebar /> */}
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}><b>Thông tin cá nhân</b></p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} columns={{ lg: 4 }} >
                            <div className={styles.infoImg} >
                                {state && <div className={styles.txt}>
                                    {(imageFile === null) &&
                                        <div>
                                            <img className={styles.userProfile} src={state.item.image} alt="" />
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
                                </div>}
                                <div className={styles.txt}>
                                    <label htmlFor="gender">Giới tính: </label>
                                    <TextField
                                        className={styles.txtGender}
                                        id="gender"
                                        defaultValue={state.item.gender}
                                        name="gender"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.gender}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt} >
                                    <label htmlFor='name'>Họ tên: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id='name'
                                        defaultValue={state.item.name}
                                        name='name'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.name}
                                    />
                                </div>
                                {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
                                <div className={styles.txt} >
                                    <label htmlFor='idCard'>Căn cước: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="idCard"
                                        name="idCard"
                                        defaultValue={state.item.passport}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.identityCard}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='dob'>Ngày sinh: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} className={styles.txtField} defaultValue={state.item.dateOfBirth}/>}
                                            // value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            format="YYYY/MM/DD"
                                            
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='pob'>Nơi sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="pob"
                                        name="pob"
                                        defaultValue={state.item.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.placeOfBirth}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='phone'>Số điện thoại: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="phone"
                                        defaultValue={state.item.phoneNumber}
                                        name="phone"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='email'>Email: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="email"
                                        name="email"
                                        defaultValue={state.item.email}
                                        type="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.email}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã giáo viên: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.idMonitor}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.major}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.password}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Đề tài: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.topic}/>
                            </div>
                        </div>
                        <div className={styles.btnForm}>
                            <div className={styles.btn}>
                                <button className={styles.button} disabled={formik.isSubmitting}>Đồng ý</button>
                            </div>
                            <div className={styles.btn}>
                                <button className={styles.button} disabled={formik.isSubmitting}>Từ chối</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    );
};

export default SRequirementDetails;
