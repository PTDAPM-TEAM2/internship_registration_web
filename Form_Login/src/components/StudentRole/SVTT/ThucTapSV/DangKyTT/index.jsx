
import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './DangKyTT.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import studentApi from "../../../../../api/studentApi";
import companyApi from "../../../../../api/companyApi";
import { useContext } from 'react';
import { ThemeContext } from '../../../../Theme/Theme';
import AlertMessage from '../../../../AdminRole/DoAn/ThemSV/Alert';
import userApi from '../../../../../api/authApi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import warningImage from '../../../../../images/warning.png';

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
const validationSchema = Yup.object({
    internshipPosition: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
    nameCompany: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
    taxCode: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
    email: Yup.string().trim().email('Nhập sai định dạng thông tin!').required('Vui lòng nhập đủ thông tin!'),
    phoneNumber: Yup.string().trim().matches(/^[0-9]{10}$/, 'Nhập sai định dạng thông tin!').required('Vui lòng nhập đủ thông tin!'),
    address: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
});

const DKTT = () => {
    // const [message, setMessage] = React.useState('');
    // const [errorMessages, setErrorMessages] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(null);
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const token = localStorage.getItem('token');
    const [start, setStart] = React.useState('');
    const [end, setEnd] = React.useState('');
    const [user, setUser] = React.useState([]);
    const getToday = new Date();
    const [errorMessages, setErrorMessages] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const initVl = {
        nameCompany: '',
        taxCode: '',
        email: '',
        phoneNumber: '',
        address: '',
        internshipPosition: '',
    };

    React.useEffect(() => {
        const getInterTime = async () => {
            try {
                const response = await studentApi.getInternshipTime();
                setStart(response.timeStart)
                setEnd(response.timeEnd);
            } catch (err) {
                console.log('Error fetching data', err);
            }
        };
        getInterTime();
    }, []);

    React.useEffect(() => {
        const getTTDASV = async () => {
            context.updateLoading(true);
            try {
                const response = await userApi.getInfo(token);
                setUser(response);
                context.updateLoading(false);
            } catch (error) {
                context.updateLoading(false);
                console.log(error);
            }
        };
        getTTDASV();
    }, [])

    const formik = useFormik({
        initialValues: initVl,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            context.updateLoading(true);
            if (getToday < start || start === null || end === null) {
                setErrorMessages("Chưa đến thời gian đăng ký thực tập!");
                context.updateLoading(false);
                setOpen(true);
            }
            else if (getToday > end) {
                setErrorMessages("Đã hết thời gian đăng ký thực tập!");
                context.updateLoading(false);
                setOpen(true);
            }
            else {
                try {
                    const response = await studentApi.internshipRegisterBySv(values, token);
                    context.updateLoading(false);
                    setErrorMessages('');
                    setShowAlert({ type: 'success', text: "Đăng ký thành công!" });
                    setTimeout(() => {
                        setShowAlert(null);
                    }, 2000)
                    console.log(response);
                } catch (error) {
                    context.updateLoading(false);
                    if (error.response.data.error) {
                        setShowAlert({ type: 'error', text: error.response.data.error });
                        setTimeout(() => {
                            setShowAlert(null);
                        }, 2000)
                    }
                }
            }
        },
    })

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();
        return day + "/" + month + "/" + year + " " + hour + ":" + minute;
    }

    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.form}>
                <AlertMessage message={showAlert} />
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Đăng ký thực tập</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} >
                            <p>Thời gian thực tập:</p>
                            
                            <div style={{ textAlign: 'start' }}>
                                <>Thời gian đăng kí:</>
                                <div>
                                    <p>Ngày bắt đầu: {transferDate(start)}</p>
                                </div>
                                <div>
                                    <p>Ngày kết thúc: {transferDate(end)}</p>
                                </div>
                            </div>

                        </div>
                        <div className={styles.inputValues}>
                            <div className={styles.infoAccount}>
                                <div className={styles.txt}>
                                    <label htmlFor='taxCode'>Mã số thuế: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="taxCode"
                                        name="taxCode"
                                        value={formik.values.taxCode}
                                        onChange={formik.handleChange}
                                        error={formik.touched.taxCode && Boolean(formik.errors.taxCode)}
                                        helperText={formik.touched.taxCode && formik.errors.taxCode}

                                    />
                                </div>


                                <div className={styles.txt}>
                                    <label htmlFor='nameCompany'>Tên công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="nameCompany"
                                        name="nameCompany"
                                        value={formik.values.nameCompany}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nameCompany && Boolean(formik.errors.nameCompany)}
                                        helperText={formik.touched.nameCompany && formik.errors.nameCompany}

                                    />
                                </div>



                                <div className={styles.txt}>
                                    <label htmlFor='phoneNumber'>SĐT công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}

                                    />
                                </div>



                                <div className={styles.txt}>
                                    <label htmlFor='email'>Email công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}

                                    />
                                </div>



                                <div className={styles.txt}>
                                    <label htmlFor='address'>Địa chỉ công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="address"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}

                                    />
                                </div>

                                <div className={styles.txt}>
                                    <label htmlFor='internshipPosition'>Ví trí thực tập: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="internshipPosition"
                                        name="internshipPosition"
                                        value={formik.values.internshipPosition}
                                        onChange={formik.handleChange}
                                        error={formik.touched.internshipPosition && Boolean(formik.errors.internshipPosition)}
                                        helperText={formik.touched.internshipPosition && formik.errors.internshipPosition}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type="submit" >Đăng ký</button>
                        </div>
                    </form>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h3" style={{ color: 'red', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={warningImage} alt="" style={{ width: '25px', height: '25px', objectFit: 'cover', marginRight: '20px' }} />{errorMessages}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                            <Button onClick={handleClose} className={styles.button}>OK</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div >
    )

}

export default DKTT;