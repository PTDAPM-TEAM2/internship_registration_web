import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemSV.module.css';
import Sidebar from '../../Sidebar';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ThemSV = () => {
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
    //         navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da');
    //     }, 1000)
    // }

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
    const phoneRegex = RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );
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

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thêm Sinh Viên</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} columns={{ lg: 4 }} >
                            <div className={styles.infoImg} >
                                <div className={styles.txt}>
                                    {(imageFile === null) &&
                                        <div>
                                            <label htmlFor="image" className={styles.upload} >
                                                <FileUploadIcon />
                                                <span>Tải lên</span>
                                            </label>
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
                                        id="gender"
                                        name="gender"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gender}
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
                                        value={formik.values.name}
                                    />
                                </div>
                                {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
                                <div className={styles.txt} >
                                    <label htmlFor='idCard'>Số căn cước: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="idCard"
                                        name="idCard"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.identityCard}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='dob'>Ngày sinh: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} className={styles.txtDate} />}
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
                                    <label htmlFor='pob'>Nơi sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="pob"
                                        name="pob"
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
                                        type="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <Grid container columns={12} spacing={2}>
                            <Grid item lg={2} xs={12}>
                                <div className={styles.txt}>
                                    {(imageFile === null) &&
                                        <div>
                                            <label htmlFor="file" className={styles.upload} >
                                                <FileUploadIcon />
                                                <span>Tải lên</span>
                                            </label>
                                            <input className={styles.fileInput} name='file' id='file' type="file" accept=".jpg, .jpeg, .png" onChange={handleImageFileChange} />
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
                                    <p>Giới tính: </p>
                                    <TextField />
                                </div>
                            </Grid>
                            <Grid item lg={5} xs={12}>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Họ tên: </p>
                                        <TextField className={styles.txtField} fullWidth />
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Ngày sinh: </p>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DatePicker
                                                renderInput={(props) => <TextField {...props} className={styles.txtDate} />}
                                                value={date}
                                                onChange={(newValue) => {
                                                    setDate(newValue);
                                                }}
                                                format="YYYY/MM/DD"
                                                defaultValue={dayjs()}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Số điện thoại: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                            </Grid>


                            <Grid item lg={5} xs={12}>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Số căn cước: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Nơi sinh: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Email: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid> */}

                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã sinh viên: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Lớp: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Kỳ: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} disabled={formik.isSubmitting}>Thêm</button>
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
                        <AlertTitle>Thêm thông tin sinh viên thành công !</AlertTitle>
                    </Alert>
                </div>
            }
        </div >
    );
};

export default ThemSV;
