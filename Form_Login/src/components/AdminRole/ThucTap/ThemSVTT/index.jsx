import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemSVTT.module.css';
import Sidebar from '../../../Sidebar';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
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


// const grade = {
//     name: '',
// }

const initialValues = {
    urlImg: '',
    fullName: '',
    gender: '',
    idNumber: '',
    dateOfBirth: new Date(),
    placeOfBitrh: '',
    phoneNumber: '',
    email: '',
    studentCode: '',
    grade: '',
    semester: '',
    password: '',

};
const validationSchema = Yup.object({
    fullName: Yup.string().trim().required(),
    email: Yup.string().trim().email().required(),
    gender: Yup.string().trim().required(),
    idNumber: Yup.string().trim().matches(/^[0-9]{12}$/).required(),
    dateOfBirth: Yup.date().max(new Date()).required(),
    placeOfBitrh: Yup.string().trim().required(),
    phoneNumber: Yup.string().trim().matches(/^[0-9]{10}$/).required(),
    studentCode: Yup.string().trim().required(),
    grade: Yup.object().required(),
    semester: Yup.string().trim().required(),
    password: Yup.string().trim().required().min(8),
});

const ThemSV = () => {
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const context = useContext(ThemeContext);
    const token = localStorage.getItem('token');
    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
    };

    const [grades, setGrade] = React.useState([]);
    React.useEffect(() => {
        const getGrade = async () => {
            try {
                const response = await studentApi.getGrade(token);
                setGrade(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getGrade()
    }, [context.token]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const errors = [];
            if (values.fullName === '') {
                errors.push('Nhập thiếu thông tin! Vui lòng nhập lại');
            }
            if (values.email === '') {
                errors.push('Nhập thiếu thông tin! Vui lòng nhập lại');
            } else if (!Yup.string().email().isValidSync(values.email)) {
                errors.push('Thông tin sai định dạng! Vui lòng nhập lại');
            }
            if (errors.length === 0) {
                setSuccessMessage('Thêm thông tin sinh viên thành công!');
                setErrorMessages([]);
            } else {
                setSuccessMessage('');
                setErrorMessages(errors);
            }
            try {
                console.log(JSON.stringify(values));
                const response = await studentApi.addSVDA(JSON.stringify(values), token);
                setTimeout(() => {
                    navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da')
                }, 2000)
            } catch (error) {
                console.error(error);
            }
        },
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
                                <div >
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
                                                onChange={handleImageFileChange}
                                                value={formik.values.urlImg}
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
                                <div className={styles.gender}>
                                    <label htmlFor="gender">Giới tính: </label>
                                    <TextField
                                        id="gender"
                                        name="gender"
                                        onChange={formik.handleChange}
                                        value={formik.values.gender}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    />
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
                                            />}
                                            value={formik.values.dateOfBirth}
                                            onChange={(value) => formik.handleChange({ target: { name: 'dateOfBirth', value } })}
                                            // onChange={formik.handleChange}
                                            // name='dateOfBirth'
                                            format="YYYY/MM/DD"
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
                                >
                                    {grades.map((option) => (
                                        <MenuItem key={option.id} value={option}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
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
                                <label htmlFor='semester'>Kỳ: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="semester"
                                    name="semester"
                                    value={formik.values.semester}
                                    onChange={formik.handleChange}
                                    error={formik.touched.semester && Boolean(formik.errors.semester)}
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
                                    type='password'
                                // disabled
                                />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type="submit" onClick={() => {
                                setShowAlert(true);
                                console.log(formik.touched);
                                setTimeout(() => {
                                    setShowAlert(false);
                                }, 2000)

                            }}>Thêm</button>
                        </div>
                    </form>
                </div>

            </div>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessages.map((error, index) => (
                <Alert key={index} severity="error">
                    {error}
                </Alert>
            ))}
        </div >
    );
};

export default ThemSV;
