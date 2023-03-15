import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from '../DanhSachDAChiTiet/ProjectInfDetails.module.css';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

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

const PInformationDetails = () => {
    const location = useLocation()
    const state = location.state;
    const [showAlert, setShowAlert] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(`aaa ${state.item.name}`);

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
    }

    function handleGo() {
        setOpen(false);
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

    const navigate = useNavigate();

    function toComponent(item){
        navigate('danh-gia-tien-trinh', {state: {item}})
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* <Sidebar /> */}
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}><b>Thông tin đồ án</b></p>
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
                                    <button className={styles.button} disabled={formik.isSubmitting} onClick = {() => {toComponent(state.item)}}>Đánh giá tiến trình</button>
                                </div>
                                <div className={styles.btn}>
                                    <button className={styles.button} disabled={formik.isSubmitting} onClick = {handleOpen}>Cho ngừng đồ án</button>
                                </div>
                        </div>
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
