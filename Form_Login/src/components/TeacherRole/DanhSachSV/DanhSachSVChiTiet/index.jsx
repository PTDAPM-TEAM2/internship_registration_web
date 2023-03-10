import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from '../DanhSachSVChiTiet/StudentInfDetails.module.css';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
const SInformationDetails = () => {
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
                    <p className={styles.title}><b>Th??ng tin sinh vi??n</b></p>
                    <form onSubmit={formik.handleSubmit} className={styles.formInfor}>
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
                                    <label htmlFor="gender">Gi???i t??nh: </label>
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
                                    <label htmlFor='name'>H??? t??n: </label>
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
                                    <label htmlFor='idCard'>C??n c?????c: </label>
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
                                    <label htmlFor='dob'>Ng??y sinh: </label>
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
                                    <label htmlFor='pob'>N??i sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="pob"
                                        name="pob"
                                        defaultValue={state.item.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.placeOfBirth}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='phone'>S??? ??i???n tho???i: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="phone"
                                        defaultValue={state.item.phoneNumber}
                                        name="phone"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.phoneNumber}
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
                                <p>M?? sinh vi??n: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.msv}/>
                            </div>
                            <div className={styles.txt}>
                                <p>L???p: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.sClass}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.major}/>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    );
};

export default SInformationDetails;
