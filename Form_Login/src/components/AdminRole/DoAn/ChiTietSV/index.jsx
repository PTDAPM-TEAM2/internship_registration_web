import * as React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './ChiTietSV.module.css';
import { useNavigate,useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import studentApi from "../../../../api/studentApi";
import MenuItem from '@mui/material/MenuItem';

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
    textAlign: 'center',

};


const validationSchema = Yup.object({
    fullName: Yup.string().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    email: Yup.string().email('Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    gender: Yup.string().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    idNumber: Yup.string().matches(/^[0-9]{12}$/,'Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    dateOfBirth: Yup.date().max(new Date()).required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    placeOfBitrh: Yup.string().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/,'Nhập sai định dạng thông tin! Vui lòng nhập lại!').required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    studentCode: Yup.string().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    grade: Yup.object().required('Nhập thiếu thông tin! Vui lòng nhập lại!'),
    password: Yup.string().min(8,'Nhập sai định dạng thông tin! Vui lòng nhập lại!'),
});

const ChiTietSV = () => {
    const context = useContext(ThemeContext);
    const [showAlert, setShowAlert] = React.useState(false);
    const [showAlertD, setShowAlertD] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [date, setDate] = React.useState(dayjs());
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation();
    const state = location.state;
    const { id } = useParams()

    const grade = {
        name: state.item.grade.name
        // id: state.item.grade.id,
        // students: state.item.grade.students
    }
    
    const genders = [
        { value: "male", label: "Nam" },
        { value: "female", label: "Nữ" },
        { value: "other", label: "Khác" },
    ];

    const initialValues = {
        urlImg: state.item.urlImg || '',
        fullName: state.item.fullName || '',
        gender: state.item.gender || '',
        idNumber: state.item.idNumber || '',
        dateOfBirth: new Date(state.item.dateOfBirth) || '',
        placeOfBitrh: state.item.placeOfBitrh || '',
        phoneNumber: state.item.phoneNumber || '',
        email: state.item.email || '',
        studentCode: state.item.studentCode || '',
        grade: grade,
        //van de quan trong
        password: '',
    };

    console.log(state.item.password);


    const token = localStorage.getItem('token');
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
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            context.updateLoading(true);
            try {
                const response = await studentApi.updateSVDA(JSON.stringify(values), state.item.id);
                setShowAlert(true);
                context.updateLoading(false);
                setTimeout(() => {
                    setShowAlert(false);
                    navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da')
                }, 2000)
            } catch (error) {
                context.updateLoading(false);
                console.error(error);
            }
        },
    })

    const handleDelete = async () => {
        context.updateLoading(true);
        try {
            const response = await studentApi.deleteSVDA(state.item.id);
            setOpen(false);
            context.updateLoading(false);
            setShowAlertD(true);
            setTimeout(() => {
                setShowAlertD(false);
                navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da')
            }, 1000)
        }
        catch (error) {
            context.updateLoading(false);
            console.error('Error deleting data: ', error);
        };
    };


    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thông tin chi tiết sinh viên</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount}>
                            <div className={styles.infoImg}>
                                <div >
                                    <div className={styles.image}>
                                        <img src={state.item.urlImg} alt='avatar' style={{ maxWidth: '100%' }} />
                                    </div>
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
                                <div className={styles.txt}>
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
                                <div className={styles.txt}>
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
                                            renderInput={(props) => <TextField {...props} style={{ width: 400 }} value={new Date(formik.values.dateOfBirth)} />}
                                            value={formik.values.dateOfBirth}
                                            onChange={(value) => formik.handleChange({ target: { name: 'dateOfBirth', value } })}
                                            format="YYYY/MM/DD"
                                            maxDate={new Date()}
                                            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
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
                                    disabled
                                />
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='grade.name'>Lớp: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    select
                                    id='grade'
                                    name='grade.name'
                                    value={formik.values.grade.name}
                                    onChange={formik.handleChange}
                                    disabled
                                >
                                    {grades.map((grade) => (
                                        <MenuItem key={grade.id} value={grade.name}>
                                            {grade.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='semester'>Kỳ: </label>
                                <TextField defaultValue={context.cellValidateSemester(state.item.graduationThesis)} className={styles.txtFieldBot} />

                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='password'>Mật khẩu: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    type='password'
                                // disabled
                                />
                            </div>
                            <div className={styles.txt}>
                                <p>Tên đề tài đồ án: </p>
                                <TextField defaultValue={context.cellValidateName(state.item.graduationThesis)} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Giảng viên hướng dẫn: </p>
                                <TextField defaultValue={context.cellValidateLecturer(state.item.graduationThesis)} className={styles.txtFieldBot} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type='submit' onClick={() => console.log(formik.errors)} >Sửa</button>
                            <button className={styles.button} type='button' onClick={handleOpen}>Xóa</button>
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
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Có muốn xóa không ?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                        <button className={styles.button} sx={{ color: 'white' }} onClick={handleDelete}>Có</button>
                        <button className={styles.button} sx={{ color: 'white' }} onClick={handleClose}>Không</button>
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
                        <AlertTitle>Sửa thông tin sinh viên thành công !</AlertTitle>
                    </Alert>
                </div>}

            {showAlertD &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Xóa thông tin sinh viên thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ChiTietSV;
