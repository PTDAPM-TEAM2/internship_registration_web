import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemGV.module.css';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import lecturerApi from "../../../../api/lecturerApi";
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import AlertMessage from '../ThemSV/Alert';


const genders = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
    { value: "Khác", label: "Khác" },
];

const initialValues = {
    urlImg: '',
    fullName: '',
    gender: '',
    idNumber: '',
    dateOfBirth: '',
    placeOfBitrh: '',
    phoneNumber: '',
    email: '',
    lecturersCode: '',
    password: '',

};
const validationSchema = Yup.object({
    fullName: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    email: Yup.string().trim().email('Nhập sai định dạng thông tin! Vui lòng nhập lại').required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    gender: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    idNumber: Yup.string().trim().matches(/^[0-9]{12}$/, 'Nhập sai định dạng thông tin! Vui lòng nhập lại').required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    dateOfBirth: Yup.date().typeError('Nhập thiếu thông tin! Vui lòng nhập lại').required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    placeOfBitrh: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    phoneNumber: Yup.string().trim().matches(/^[0-9]{10}$/, 'Nhập sai định dạng thông tin! Vui lòng nhập lại').required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    lecturersCode: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại'),
    password: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại').min(8, 'Nhập sai định dạng thông tin! Vui lòng nhập lại'),
});

const ThemGV = () => {
    // const [message, setMessage] = React.useState('');
    // const [errorMessages, setErrorMessages] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(null);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const context = useContext(ThemeContext);
    const token = localStorage.getItem('token');
   

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            context.updateLoading(true);
            try {
                console.log(values);
                const response = await lecturerApi.addGV(JSON.stringify(values), token);
                context.updateLoading(false);
                URL.revokeObjectURL(imageFile);
                setShowAlert({ type: 'success', text: "Thêm giảng viên thành công" });
                setTimeout(() => {
                    setShowAlert(null);
                    navigate('/quan-ly-giang-vien/danh-sach-giang-vien')
                }, 2000)
            } catch (error) {
                context.updateLoading(false);
                if (error.response.data.error) {
                    setShowAlert({ type: 'error', text: error.response.data.error });
                    setTimeout(() => {
                        setShowAlert(null);
                    }, 2000)
                }

            }
        },
    })


    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.form}>
                <AlertMessage message={showAlert} />
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thêm Giảng Viên</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} columns={{ lg: 4 }} >
                            <div className={styles.infoImg} >
                                <div>
                                    {(imageFile === null) &&
                                        <div>
                                            <label htmlFor="urlImg" className={styles.upload} >
                                                <FileUploadIcon />
                                                <span>Tải lên</span>
                                            </label>
                                            <input
                                                className={styles.fileInput}
                                                name='urlImg'
                                                id='urlImg'
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(event) => {
                                                    formik.setFieldValue('urlImg', URL.createObjectURL(event.currentTarget.files[0]).slice(5));
                                                    setImageFile(URL.createObjectURL(event.currentTarget.files[0]));
                                                }}

                                            />
                                        </div>
                                    }
                                    {
                                        imageFile &&
                                        <div className={styles.image}>
                                            <img src={imageFile} alt='avatar' style={{ maxWidth: '100%' }}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className={styles.gender}>
                                    <label htmlFor="gender">Giới tính: </label>
                                    <TextField
                                        id="gender"
                                        name="gender"
                                        onChange={formik.handleChange}
                                        value={formik.values.gender}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                        helperText={formik.touched.gender && formik.errors.gender}
                                        select
                                        sx={{ width: 150, textAlign: 'left' }}
                                    >
                                        {genders.map((gender) => (
                                            <MenuItem key={gender.value} value={gender.value}>
                                                {gender.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt} >
                                    <label htmlFor='fullName'>Họ tên: </label>
                                    <TextField

                                        className={styles.txtField}
                                        id='fullName'
                                        name='fullName'
                                        onChange={formik.handleChange}
                                        value={formik.values.fullName}
                                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                        helperText={formik.touched.fullName && formik.errors.fullName}

                                    />
                                </div>
                                <div className={styles.txt} >
                                    <label htmlFor='idNumber'>Số căn cước: </label>
                                    <TextField

                                        className={styles.txtField}
                                        id="idNumber"
                                        name="idNumber"
                                        onChange={formik.handleChange}
                                        value={formik.values.idNumber}
                                        error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
                                        helperText={formik.touched.idNumber && formik.errors.idNumber}
                                        onKeyDown={(e) => {
                                            if (e.keyCode === 32) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='dateOfBirth'>Ngày sinh: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField
                                                {...props}
                                                className={styles.txtDate}
                                                error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                            />}
                                            value={formik.values.dateOfBirth}
                                            onChange={(value) => formik.handleChange({ target: { name: 'dateOfBirth', value } })}
                                            // onChange={formik.handleChange}
                                            // name='dateOfBirth'
                                            format="DD/MM/YYYY"
                                            maxDate={new Date()}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='placeOfBitrh'>Nơi sinh: </label>
                                    <TextField

                                        className={styles.txtField}
                                        id="placeOfBitrh"
                                        name="placeOfBitrh"
                                        onChange={formik.handleChange}
                                        value={formik.values.placeOfBitrh}
                                        error={formik.touched.placeOfBitrh && Boolean(formik.errors.placeOfBitrh)}
                                        helperText={formik.touched.placeOfBitrh && formik.errors.placeOfBitrh}

                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='phoneNumber'>Số điện thoại: </label>
                                    <TextField

                                        className={styles.txtField}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumber}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        onKeyDown={(e) => {
                                            if (e.keyCode === 32) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='email'>Email: </label>
                                    <TextField

                                        className={styles.txtField}
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        onKeyDown={(e) => {
                                            if (e.keyCode === 32) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <label htmlFor='lecturersCode'>Mã giảng viên: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="lecturersCode"
                                    name="lecturersCode"
                                    value={formik.values.lecturersCode}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lecturersCode && Boolean(formik.errors.lecturersCode)}
                                    helperText={formik.touched.lecturersCode && formik.errors.lecturersCode}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 32) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='password'>Mật khẩu: </label>
                                <TextField className={styles.txtFieldBot}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    type='password'
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 32) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type="submit">Thêm</button>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    );
};

export default ThemGV;
