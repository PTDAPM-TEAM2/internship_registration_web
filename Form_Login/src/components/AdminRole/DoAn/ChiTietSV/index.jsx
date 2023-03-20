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
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thông tin chi tiết sinh viên</p>
                    <form>
                        <div className={styles.formAccount}>
                            <div>
                                <div className={styles.txt}>
                                    <div className={styles.image}>
                                        <img src={state.item.urlImg} alt='avatar' style={{ maxWidth: '100%' }} />
                                    </div>
                                </div>
                                <div className={styles.txt}>
                                    <p>Giới tính: </p>
                                    <TextField defaultValue={state.item.gender} required />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt}>
                                    <p>Họ tên: </p>
                                    <TextField defaultValue={state.item.fullName} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số căn cước: </p>
                                    <TextField defaultValue={state.item.idNumber} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Ngày sinh: </p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} style={{ width: 400 }} />}
                                            value={state.item.dateOfBirth}
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
                                    <TextField defaultValue={state.item.placeOfBirth} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số điện thoại: </p>
                                    <TextField defaultValue={state.item.phoneNumber} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Email: </p>
                                    <TextField defaultValue={state.item.email} className={styles.txtField} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã sinh viên: </p>
                                <TextField defaultValue={state.item.studentCode} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Lớp: </p>
                                <TextField defaultValue={state.item.grade.name} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Kỳ: </p>
                                <TextField defaultValue={state.item.internship} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField defaultValue='********' className={styles.txtFieldBot} type='password'/>
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
                            <Button className={styles.button} onClick={handleSubmit}>Sửa</Button>
                            <Button className={styles.button} onClick={() => { handleDelete(state.item)}}>Xóa</Button>
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
