import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from '../DanhSachDAChiTiet/ProjectInfDetails.module.css';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
const PInformationDetails = () => {
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
                    <p className={styles.title}><b>Thông tin đồ án</b></p>
                    <form onSubmit={formik.handleSubmit} className={styles.formInfor}>
                        <div className={styles.formAccount} columns={{ lg: 4 }} >
                            <div className={styles.formtitle}>
                                <p><b>Đề tài:</b>{state.item.topicName}</p>
                                <p><b>Tên sinh viên:</b>{state.item.name}</p>
                                <p><b>Mã sinh viên:</b>{state.item.id}</p>
                            </div>
                            <div className={styles.formContent}>
                                <label htmlFor="content"><b>Nội dung: </b></label>
                                <textarea
                                    className={styles.txtContent}
                                    id="content"
                                    defaultValue={state.item.gender}
                                    name="content"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                        // value={formik.values.gender}
                                />
                            </div>
                        </div>
                        <div className={styles.btnForm}>
                                <div className={styles.btn}>
                                    <button className={styles.button} disabled={formik.isSubmitting}>Đánh giá tiến trình</button>
                                </div>
                                <div className={styles.btn}>
                                    <button className={styles.button} disabled={formik.isSubmitting}>Cho ngừng đồ án</button>
                                </div>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    );
};

export default PInformationDetails;
