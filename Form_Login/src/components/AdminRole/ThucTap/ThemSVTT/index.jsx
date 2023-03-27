import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemSVTT.module.css';
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
import companyApi from "../../../../api/companyApi";
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import AlertMessage from '../../DoAn/ThemSV/Alert';



const validationSchema = Yup.object({
    fullName: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    email: Yup.string().trim().email('Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    gender: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    idNumber: Yup.string().trim().matches(/^[0-9]{12}$/, 'Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    dateOfBirth: Yup.date().max(new Date()).required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    placeOfBitrh: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    phoneNumber: Yup.string().trim().matches(/^[0-9]{10}$/, 'Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    studentCode: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    grade: Yup.object().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    password: Yup.string().trim().required('Nhập thiếu thông tin! Vui lòng nhập lại!').min(8, 'Nhập sai định dạng thông tin! Vui lòng nhập lại!'),
});

const ThemSVTT = () => {
    // const [message, setMessage] = React.useState('');
    // const [errorMessages, setErrorMessages] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(null);
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
    const internship = {
        start: '',
        end: '',
        company: '',
    }
    const grade = {
        name: ''
    }
    const genders = [
        { value: "Nam", label: "Nam" },
        { value: "Nữ", label: "Nữ" },
        { value: "Khác", label: "Khác" },
    ];
    const initVl = {
        urlImg: '',
        fullName: '',
        gender: '',
        idNumber: '',
        dateOfBirth: new Date(),
        placeOfBitrh: '',
        phoneNumber: '',
        email: '',
        studentCode: '',
        grade: grade,
        password: '',
        internship: internship

    };

    const [companies, setCompanies] = React.useState([]);
    React.useEffect(() => {
        const getCompany = async () => {
            context.updateLoading(true);
            try {
                const response = await companyApi.getCompanies(token);
                setCompanies(response);
                context.updateLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                context.updateLoading(false);

            }
        }
        getCompany()
    }, []);

    const [grades, setGrade] = React.useState([]);
    React.useEffect(() => {
        context.updateLoading(true);
        const getGrade = async () => {
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
        initialValues: initVl,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            context.updateLoading(true);
            try {
                const response = await studentApi.addSVTT(JSON.stringify(values), token);
                context.updateLoading(false);
                setShowAlert({ type: 'success', text: "Thêm sinh viên thành công" });
                setTimeout(() => {
                    setShowAlert(null);
                    navigate('/quan-ly-sinh-vien-tt/danh-sach-sinh-vien-tt')
                }, 2000)
            } catch (error) {
                context.updateLoading(false);
                if (error.response.data.messgae) {
                    setShowAlert({ type: 'error', text: error.response.data.messgae });
                    setTimeout(() => {
                        setShowAlert(null);
                    }, 2000)
                }
            }
        },
    })
    
    console.log(formik.values);



    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.form}>
                <AlertMessage message={showAlert} />
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

                                />
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='internship'>Tên công ty thực tập: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    select
                                    id='internship'
                                    name='internship.company'
                                    value={formik.values.internship.company}
                                    onChange={formik.handleChange}
                                    error={formik.touched.internship && Boolean(formik.errors.internship)}
                                >
                                    {companies.map((option) => (
                                        <MenuItem key={option.id} value={option}>
                                            {option.nameCompany}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='internship.start'>Bắt đầu: </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        renderInput={(props) => <TextField
                                            {...props}
                                            className={styles.txtFieldBot}
                                            error={formik.touched.internship && Boolean(formik.errors.internship)}
                                        />}
                                        
                                        value={formik.values.internship.start}
                                        onChange={(value) => formik.handleChange({ target: { name: 'internship.start', value } })}
                                        // onChange={formik.handleChange}
                                        // name='internship.start'
                                        format="YYYY/MM/DD"
                                    />
                                </LocalizationProvider>
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
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='internship.end'>Kết thúc: </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        renderInput={(props) => <TextField
                                            {...props}
                                            className={styles.txtFieldBot}
                                            error={formik.touched.internship && Boolean(formik.errors.internship)}
                                        />}
                                        value={formik.values.internship.end}
                                        onChange={(value) => formik.handleChange({ target: { name: 'internship.end', value } })}
                                        format="YYYY/MM/DD"
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type="submit">Thêm</button>
                            {/* <button className={styles.button} type="submit" onClick={ handleSubmit(formik.initialValues)}>Thêm</button> */}
                        </div>
                    </form>
                </div>

            </div>
        </div >
    );
};

export default ThemSVTT;
