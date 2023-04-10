import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemSV.module.css';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import studentApi from "../../../../api/studentApi";
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import AlertMessage from './Alert.js';


const grade = {
    name: '',
}

const genders = [
    { value: "Nam", label: "Nam" },
    { value: "Nữ", label: "Nữ" },
    { value: "Khác", label: "Khác" },
];


const validationSchema = Yup.object({
    fullName: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    email: Yup.string().trim().email('Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    gender: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    idNumber: Yup.string().trim().matches(/^[0-9]{12}$/, 'Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    dateOfBirth: Yup.date().typeError('Nhập thiếu thông tin! Vui lòng nhập lại').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    placeOfBitrh: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    phoneNumber: Yup.string().trim().matches(/^[0-9]{10}$/, 'Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    studentCode: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    grade: Yup.object().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    password: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!').min(8, 'Nhập sai định dạng thông tin! Vui lòng nhập lại!'),
});

const ThemSV = () => {
    // const [message, setMessage] = React.useState('');
    // const [errorMessages, setErrorMessages] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(null);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const context = useContext(ThemeContext);
    const token = localStorage.getItem('token');
    const initialValues = {
        urlImg: '',
        fullName: '',
        gender: '',
        idNumber: '',
        dateOfBirth: '',
        placeOfBitrh: '',
        phoneNumber: '',
        email: '',
        studentCode: '',
        grade: grade,
        password: '',

    };

    const [grades, setGrade] = React.useState([]);
    React.useEffect(() => {
        const getGrade = async () => {
            context.updateLoading(true);
            try {
                const response = await studentApi.getGrade(token);
                setGrade(response);
                context.updateLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                context.updateLoading(false);
            }
        }
        getGrade()
    }, []);
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            context.updateLoading(true);
            try {
                const response = await studentApi.addSVDA(JSON.stringify(values), token);
                setShowAlert({ type: 'success', text: "Thêm sinh viên thành công" });
                context.updateLoading(false);
                URL.revokeObjectURL(imageFile);
                setTimeout(() => {
                    setShowAlert(null);
                    navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da')
                }, 2000)
            } catch (error) {
                context.updateLoading(false);
                if (error.response.data.messgae) {
                    setShowAlert({ type: 'error', text: error.response.data.messgae });
                    setTimeout(() => {
                        setShowAlert(null);
                    }, 2000)
                }
                if (error.response.data.status === 403) {
                    setShowAlert({ type: 'error', text: "Lỗi kết nối!" });
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
                    <p className={styles.title}>Thêm sinh viên</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} >
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
                                                    formik.setFieldValue('urlImg', URL.createObjectURL(event.currentTarget.files[0]));
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
                                <label htmlFor='studentCode'>Mã sinh viên: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="studentCode"
                                    name="studentCode"
                                    value={formik.values.studentCode}
                                    onChange={formik.handleChange}
                                    error={formik.touched.studentCode && Boolean(formik.errors.studentCode)}
                                    helperText={formik.touched.studentCode && formik.errors.studentCode}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 32) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='grade'>Lớp: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    select
                                    id='grade'
                                    name='grade'
                                    value={formik.values.grade}
                                    onChange={formik.handleChange}
                                    error={formik.touched.grade && Boolean(formik.errors.grade)}
                                    helperText={formik.touched.grade && formik.errors.grade}
                                >
                                    {/* <ul style={{ maxHeight: 150 }}> */}
                                    {grades.map((option) => (
                                        <MenuItem key={option.id} value={option} >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                    {/* </ul> */}
                                </TextField>
                                {/* <TextField
                                    className={styles.txtFieldBot}
                                    id="grade"
                                    name="grade.name"
                                    select
                                    value={formik.values.grade.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.grade && Boolean(formik.errors.grade)}
                                >
                                    <div style={{ maxHeight: 200 }}>
                                        {grades.map((grade) => (
                                            <MenuItem key={grade.id} value={grade.id} >
                                                {grade.name}
                                            </MenuItem>
                                        ))}
                                    </div>
                                </TextField> */}
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
                            <button className={styles.button} type="submit" onClick={console.log(formik.values)}>Thêm</button>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    );
};

export default ThemSV;
