import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemGV.module.css';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Sidebar from '../../../Sidebar';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ThemGV = () => {
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

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setShowAlert(true);
    //     setTimeout(() => {
    //         navigate('/quan-ly-giao-vien-da/danh-sach-giao-vien-da');
    //     }, 1000)
    // }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string()
            .email("Invalid email address")
            .required("It is required"),
        gender: Yup.string().required('Required'),
        idCard: Yup.string()
            .matches(/^[A-Z]{2}\d{7}$/, "Invalid identity card format")
            .required("Required"),
        dob: Yup.string().required('Required'),
        pob: Yup.string().required('Required'),
        phone: Yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required")

    });
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

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    })

    return (

        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thêm Giảng Viên</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount}>
                            <div>
                                <div className={styles.txt}>
                                    {
                                        imageFile ?
                                            <div className={styles.image}>
                                                <img src={imageUrl} alt='avatar' style={{ maxWidth: '100%' }} />
                                            </div>
                                            :
                                            <div>
                                                <label htmlFor="file" className={styles.upload} >
                                                    <FileUploadIcon />
                                                    <span>Tải lên</span>
                                                </label>
                                                <input className={styles.fileInput} name='file' id='file' type="file" accept=".jpg, .jpeg, .png" onChange={handleImageFileChange} />
                                            </div>
                                    }
                                </div>
                                <div className={styles.txt}>
                                    <p>Giới tính: </p>
                                    <TextField 
                                        className={styles.txtField}
                                        id="gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        sx={{ width: 140 }}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt}>
                                    <p>Họ tên: </p>
                                    <TextField
                                        className={styles.txtField}
                                        id="name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số căn cước: </p>
                                    <TextField
                                        className={styles.txtField}
                                        id="idCard"
                                        name="idCard"
                                        value={formik.values.idCard}
                                        onChange={formik.handleChange}
                                        error={formik.touched.idCard && Boolean(formik.errors.idCard)}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <p>Ngày sinh: </p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} style={{ width: 400 }} />}
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            format="YYYY/MM/DD"
                                            defaultValue={dayjs()}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={styles.txt}>
                                    <p>Nơi sinh: </p>
                                    <TextField
                                        className={styles.txtField}
                                        id="dob"
                                        name="dob"
                                        value={formik.values.dob}
                                        onChange={formik.handleChange}
                                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số điện thoại: </p>
                                    <TextField
                                        className={styles.txtField}
                                        id="phone"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <p>Email: </p>
                                    <TextField
                                        className={styles.txtField}
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã giảng viên{'('} Tên đăng nhập {')'}: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Số lượng SV quản lý: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} style={{ color: 'white' }}>Thêm</button>
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
                        <AlertTitle>Thêm thông tin sinh viên thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ThemGV;
