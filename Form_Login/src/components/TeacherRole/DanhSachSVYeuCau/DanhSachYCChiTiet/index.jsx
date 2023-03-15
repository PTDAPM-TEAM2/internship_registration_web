import * as React from 'react';
import { TextField } from '@mui/material';
// import styles from 'Information.module.css';
import styles from './StudentDetails.module.css';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



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


const SRequirementDetails = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation()
    const state = location.state;
    const [password, setPassword] = React.useState("");

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  

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

    function handleGo() {
        setOpen(false);
        setShowAlert(true);
        // data.filter((data) => item.id !== id);
        setTimeout(() => {
            navigate('/danh-sach-sinh-vien-yeu-cau');
        }, 1000)
    }
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
                                            <img className={styles.userProfile} src={state.item.profileImage} alt="" />
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
                                    <label htmlFor='name'>Họ và tên: </label>
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
                                    <TextField
                                        className={styles.txtField}
                                        id="idCard"
                                        name="idCard"
                                        defaultValue={state.item.dateOfBirth.substr(0,10)}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        // value={formik.values.identityCard}
                                    />
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
                                        defaultValue={state.item.numberPhone}
                                        name="phone"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.numberPhone}
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
                                <p>Lớp: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.sClass}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.major}/>
                            </div>
                            <div className={styles.txt}>
                                <p>Đề tài: </p>
                                <TextField className={styles.txtField} defaultValue={state.item.topic}/>
                            </div>
                        </div>
                        <div className={styles.btnForm}>
                            <div className={styles.btn}>
                                <button className={styles.button} disabled={formik.isSubmitting} onClick={handleOpen}>Đồng ý</button>
                            </div>
                            <div className={styles.btn}>
                                <button className={styles.button} disabled={formik.isSubmitting} onClick={handleOpen}>Từ chối</button>
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
                        Bạn có chắc chắn với sự lựa chọn này không ?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                        <Button className={styles.button} onClick={handleGo}>Có</Button>
                        <Button className={styles.button} onClick={handleClose}>Không</Button>
                    </div>
                </Box>
            </Modal>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Xác nhận yêu cầu thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div >
    );
};

export default SRequirementDetails;
