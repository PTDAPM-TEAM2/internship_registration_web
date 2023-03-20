import * as React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './ChiTietSV.module.css';
import Sidebar from '../../../Sidebar';
import { useNavigate } from 'react-router-dom';
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
import Variables from '../../../../utils/variables';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import studentApi from "../../../../api/studentApi";
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';

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
    fullName: Yup.string().required(),
    email: Yup.string().email().required(),
    gender: Yup.string().required(),
    idNumber: Yup.string().matches(/^[0-9]{12}$/).required(),
    dateOfBirth: Yup.date().max(new Date()).required(),
    placeOfBirth: Yup.string().required(),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/).required(),
    studentCode: Yup.string().required(),
    grade: Yup.object().required(),
    semester: Yup.string().required(),
    password: Yup.string().required(),
});

const ChiTietSV = () => {
    const context = useContext(ThemeContext);
    const [showAlert, setShowAlert] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [date, setDate] = React.useState(dayjs());
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation();
    const state = location.state;
    const {id} = useParams()

    const handleSubmit = () => {
        setShowAlert(true);
        setTimeout(() => {
            navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da');
            setShowAlert(false);
        }, 1000)
    }

    function handleGo() {
        setOpen(false);
        setTimeout(() => {
            navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da');
        }, 500)
    }

    const handleDelete = (item) => {
        Variables.studentList = Variables.studentList.filter(i => (i.Hoten !== item.Hoten));
        // console.log(item.Hoten);
        // setShowAlert(true);
        navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da');
    }

    const initialValues = {
        urlImg: state.item.urlImg || '',
        fullName: state.item.fullName || '',
        gender: state.item.gender || '',
        idNumber: state.item.idNumber || '',
        dateOfBirth: new Date(state.item.dateOfBirth) || '',
        placeOfBirth: state.item.placeOfBirth || '',
        phoneNumber: state.item.phoneNumber || '',
        email: state.item.email || '',
        studentCode: state.item.studentCode || '',
        grade: {
            id: state.item.grade.id,
            name: state.item.grade.name,
            students: state.item.grade.students
        } ,
        semester: state.item.semester || '',
        //van de quan trong
        password: '********',
    };

    console.log(state.item.grade.name);

    const token = localStorage.getItem('token');
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
    }, []);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            try {
                // values.dateOfBirth = new Date(values.dateOfBirth);
                // console.log( values.dateOfBirth);
                const response = await studentApi.updateSVDA(JSON.stringify(values), state.item.id);
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
                                    />
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
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='placeOfBirth'>Nơi sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="placeOfBirth"
                                        name="placeOfBirth"
                                        onChange={formik.handleChange}
                                        value={formik.values.placeOfBirth}
                                        error={formik.touched.placeOfBirth && Boolean(formik.errors.placeOfBirth)}
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
                                    disabled
                                />
                            </div>
                            <div className={styles.txt}>
                                <label htmlFor='grade'>Lớp: </label>
                                <TextField
                                    className={styles.txtFieldBot}
                                    select
                                    id='grade'
                                    name='grade'
                                    value={formik.values.grade.name}
                                    onChange={formik.handleChange}
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
                                <TextField
                                    defaultValue='********'
                                    className={styles.txtFieldBot}
                                    id="password"
                                    name="password"
                                    // value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
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
                                <TextField defaultValue={context.cellValidateLecture(state.item.graduationThesis)} className={styles.txtFieldBot} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type='submit' onClick={() => console.log(formik.values, formik.errors)}>Sửa</button>
                            <Button className={styles.button} onClick={() => { handleDelete(state.item) }}>Xóa</Button>
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
                        <button className={styles.button} sx={{ color: 'white' }} onClick={handleGo}>Có</button>
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
        </div>
    );
};

export default ChiTietSV;
