import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from '../DanhGiaTienTrinh/ProcessEvaluation.module.css';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
const ProcessEvaluation = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const state = location.state;
    console.log(`aaa ${state.item.name}`);

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }

    function handleGo() {
        setShowAlert(true);
        // data.filter((data) => item.id !== id);
        setTimeout(() => {
            navigate('/danh-sach-do-an-sinh-vien');
        }, 1000)
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
                    <p className={styles.title}><b>Đánh giá tiến trình</b></p>
                    <form onSubmit={formik.handleSubmit} className={styles.formInfor}>
                        <div className={styles.formAccount} columns={{ lg: 4 }} >
                            <div className={styles.formtitle}>
                                <div className={styles.titleLeft}>
                                    <p><b>Đề tài: </b>{state.item.topic}</p>
                                    <p><b>Kỳ: </b>12/2022 - {state.item.period.substr(0, 4)}</p>
                                </div>
                                <div className={styles.titleRight}>
                                    <p><b>Tên sinh viên: </b>{state.item.name}</p>
                                    <p><b>Mã sinh viên: </b>{state.item.idsv}</p>
                                </div>
                                
                            </div>
                            <div className={styles.formContent}>
                                <label htmlFor="content"><b>Nội dung: </b></label>
                                <textarea
                                    className={styles.txtContent}
                                    id="content"
                                    defaultValue={state.item.content}
                                    name="content"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                        // value={formik.values.gender}
                                />
                            </div>
                        </div>
                        <div className={styles.btnForm}>
                            <div className={styles.btn}>
                                <button className={styles.button} disabled={formik.isSubmitting} onClick = {() => handleGo()}>Lưu</button>
                             </div>
                        </div>
                    </form>
                </div>
            </div>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Lưu thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div >
    );
};

export default ProcessEvaluation;
