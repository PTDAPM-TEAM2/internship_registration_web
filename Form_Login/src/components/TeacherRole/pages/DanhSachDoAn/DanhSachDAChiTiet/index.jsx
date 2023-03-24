import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from './ProjectInfDetails.module.css';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { ThemeContext } from '../../../../Theme/Theme.jsx'; 
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import graduationThesis from '../../../../../api/graduationThesis';
import userApi from '../../../../../api/authApi';
import teacherRoleController from '../../../controller/TeacherRoleController';

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

const body = {
    "title": null,
    "content":"Dang hoan thanh dc 55% -  tot",
    "graduationThesis":{
        "id": null
    }
}

const PInformationDetails = () => {
    const location = useLocation()
    const state = location.state;
    const [showAlert, setShowAlert] = React.useState(false);
    const context = useContext(ThemeContext);
    const token = localStorage.getItem('token');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const handleSubmit = (values, { setSubmitting }) => {
    //     console.log(values);
    //     setSubmitting(false);
    // }

    function handleGo() {
        setOpen(false);
        setShowAlert(true);
        // data.filter((data) => item.id !== id);
        setTimeout(() => {
            navigate('/danh-sach-do-an-sinh-vien');
        }, 1000)
    }

    const [review, setReviewList] = React.useState([]);


    useEffect(() => {

        const getAllWeeklyReview = async () => {
            try{
                const response = await graduationThesis.weeklyTeacherReview(state.item.id, token);
                setReviewList(response)
            }catch(err){
                console.log(err);
            }
        }


        // const getAllWeeklyReview = async () => {
        //     try{
        //         const response = await graduationThesis.weeklyTeacherSaving(null, context.token);
        //         setReviewList(response)
        //     }catch(err){
        //         console.log(err);
        //     }
        // }
        getAllWeeklyReview();
        // currentUser();
    }, [])

    const initialValues = {
        id: state.item.id,
        status: 2
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try{
                await teacherRoleController.forceToStopResearch(values, token)
            }catch(err){
                console.log(err);
            }
        },
    })

    // initialValues.id = state.item.id;



    const navigate = useNavigate();

    function toComponent(item){
        navigate('danh-gia-tien-trinh', {state: {data1: item}})
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* <Sidebar /> */}
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}><b>Thông tin đồ án</b></p>
                    <form onSubmit={formik.handleSubmit} className={styles.formInfor}>
                        {
                            <div>
                                <div className={styles.formAccount} columns={{ lg: 4 }} >
                                    <div className={styles.formtitle}>
                                        <div className={styles.titleLeft}>
                                            <p><b>Đề tài: </b>{state.item.nameGraduationThesis}</p>
                                            <p><b>Kỳ: </b>{state.item.semester.code}</p>
                                        </div>
                                        <div className={styles.titleRight}>
                                            <p><b>Tên sinh viên: </b>{state.item.student.fullName}</p>
                                            <p><b>Mã sinh viên: </b>{state.item.student.studentCode}</p>
                                        </div>
                                    </div>
                                    <div className={styles.formContent}>
                                        <label htmlFor="content"><b>Nội dung: </b></label>
                                        <textarea
                                            className={styles.txtContent}
                                            id="content"
                                            // listContentReview.map((content) => content)
                                            defaultValue={review.map((value) => `${value.title}: ` + ` ${value.content}\n\n`)}
                                            name="content"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                                // value={formik.values.gender}
                                        />
                                    </div>
                                </div>
                                <div className={styles.btnForm}>
                                        <div className={styles.btn}>
                                            <button className={styles.button} disabled={formik.isSubmitting} onClick = {() => {toComponent(state.item)}}>Đánh giá tiến trình</button>
                                        </div>
                                        <div className={styles.btn}>
                                            <button className={styles.button} disabled={formik.isSubmitting} onClick = {handleOpen}>Cho ngừng đồ án</button>
                                        </div>
                                </div>  
                            </div>
                        }
                    </form>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Có muốn cho ngưng đồ án không ?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                        <Button className={styles.button} onClick={handleGo}>Có</Button>
                        <Button className={styles.button} onClick={handleClose}>Không</Button>
                    </div>
                </Box>
            </Modal>
        </div >
    );
};

export default PInformationDetails;
