import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ChiTietXD.module.css';
import Sidebar from '../../../Sidebar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
};

const ChiTietXD = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();
    function handleGo() {
        setOpen(false);
        setShowAlert(true);
        setTimeout(() => {
            navigate('/quan-ly-do-an/danh-sach-do-an');
        }, 1000)
    }
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.form}>
                <div style={{ width: '100%', border: '1px solid black' }}>
                    <p className={styles.title}>Xét duyệt đồ án</p>
                    <form className={styles.formInput}>
                        <div className={styles.txt}>
                            <p>Tên Sinh Viên: </p>
                            <TextField label={state.item.SinhVien} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Tên Đồ Án: </p>
                            <TextField label={state.item.DoAn} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Mã Sinh Viên: </p>
                            <TextField label={state.item.MaSV} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Kỳ Đồ Án: </p>
                            <TextField label={state.item.Ky} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Lớp: </p>
                            <TextField label={state.item.Lop} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>File đánh giá của giảng viên: </p>
                            <TextField label={state.item.File} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Tên giảng viên: </p>
                            <TextField label={state.item.GiaoVien} className={styles.txtField} disabled />
                        </div>
                    </form>
                </div>
                <div className={styles.btn}>
                    <Button className={styles.button} onClick={handleOpen} >Đồng ý</Button>
                    <Button className={styles.button} onClick={handleOpen} >Từ chối</Button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Bạn có chắc chắn với sự lựa chọn này không ?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                        <Button className={styles.button} onClick={handleGo}>Có</Button>
                        <Button className={styles.button} onClick={handleGo}>Không</Button>
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
                        <AlertTitle>Xác nhận yêu cầu thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ChiTietXD;
