import * as React from 'react';
import { Button, TextField } from '@mui/material';
import styles from './ChiTietGV.module.css';
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
import Sidebar from '../../../Sidebar';
import { useLocation } from 'react-router-dom';
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

const ChiTietGV = () => {
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
            navigate('/quan-ly-giao-vien-da/danh-sach-giao-vien-da');
            setShowAlert(false);
        }, 1000)
        console.log('Sửa');
    }

    function handleGo() {
        setOpen(false);
        setTimeout(() => {
            navigate('/quan-ly-giao-vien-da/danh-sach-giao-vien-da');
        }, 500)
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thông tin chi tiết giảng viên</p>
                    <form>
                        <div className={styles.formAccount}>
                            <div>
                                <div className={styles.txt}>
                                    <div className={styles.image}>
                                        <img src="" alt='avatar' style={{ maxWidth: '100%' }} />
                                    </div>
                                </div>
                                <div className={styles.txt}>
                                    <p>Giới tính: </p>
                                    <TextField defaultValue='Nữ' required />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt}>
                                    <p>Họ tên: </p>
                                    <TextField defaultValue={state.item.TenGiangVien} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số căn cước: </p>
                                    <TextField defaultValue={state.item.SĐT}className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Ngày sinh: </p>
                                    <TextField defaultValue={state.item.NgaySinh}className={styles.txtField} />
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} style={{ width: 400 }} />}
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            format="YYYY/MM/DD"
                                            defaultValue={dayjs('01/02/1988')}
                                        />
                                    </LocalizationProvider> */}
                                </div>
                                <div className={styles.txt}>
                                    <p>Nơi sinh: </p>
                                    <TextField defaultValue={state.item.NoiSinh} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số điện thoại: </p>
                                    <TextField defaultValue={state.item.SĐT} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Email: </p>
                                    <TextField defaultValue={state.item.email} className={styles.txtField} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã giảng viên: </p>
                                <TextField defaultValue={state.item.MaGV} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField defaultValue={state.item.Khoa} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Số lượng SV quản lý: </p>
                                <TextField defaultValue={state.item.SLSV} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField defaultValue={state.item.Mk} className={styles.txtFieldBot} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <Button className={styles.button} onClick={handleSubmit}>Sửa</Button>
                            <Button className={styles.button} onClick={handleOpen}>Xóa</Button>
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
                        <Button className={styles.button} onClick={handleGo}>Có</Button>
                        <Button className={styles.button} onClick={handleClose}>Không</Button>
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
                        <AlertTitle>Sửa thông tin giảng viên thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ChiTietGV;
