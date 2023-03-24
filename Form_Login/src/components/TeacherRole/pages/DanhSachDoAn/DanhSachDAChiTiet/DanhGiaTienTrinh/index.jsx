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
import teacherRoleController from '../../../../controller/TeacherRoleController';
import { ThemeContext } from '../../../../../Theme/Theme.jsx'; 
import { useContext } from 'react';

const body = {

}

const ProcessEvaluation = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const [date, setDate] = React.useState(new Date());
    const state = location.state;
    const token = localStorage.getItem('token');
    const context = useContext(ThemeContext);

    function handleGo() {
        setShowAlert(true);
        // data.filter((data) => item.id !== id);
        setTimeout(() => {
            navigate('/danh-sach-do-an-sinh-vien');
        }, 1000)
    }

    // body.title = 

    const initialValues = {
        title: null,
        content: null,
        graduationThesis:{
            id: state.data1.id
        }
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

    initialValues.title = date.toLocaleDateString();

    const formik = useFormik({
        initialValues,
        validation,
        onSubmit: async (values) => {
            try{
                await teacherRoleController.addWeeklyTeacherReview(values, token)
            }catch(err){
                console.log(err);
            }
        },
    })
    initialValues.content = formik.values.content;
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
                                    <p><b>Đề tài: </b>{state.data1.nameGraduationThesis}</p>
                                    <p><b>Kỳ: </b>{state.data1.semester.code}</p>
                                </div>
                                <div className={styles.titleRight}>
                                    <p><b>Tên sinh viên: </b>{state.data1.student.fullName}</p>
                                    <p><b>Mã sinh viên: </b>{state.data1.student.studentCode}</p>
                                </div>
                                
                            </div>
                            <div className={styles.formContent}>
                                <label htmlFor="content"><b>Nội dung: </b></label>
                                <textarea
                                    className={styles.txtContent}
                                    id="content"
                                    name="content"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.content}
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
