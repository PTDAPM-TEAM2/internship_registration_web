import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ChiTietXD.module.css';
import Sidebar from '../../Sidebar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
                            <TextField label="Nguyễn Đức Tâm" className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Tên Đồ Án: </p>
                            <TextField label="Quản lý du học sinh Việt Nam" className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Mã Sinh Viên: </p>
                            <TextField label="2050160693" className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Kỳ Đồ Án: </p>
                            <TextField label="01/2022-2023" className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Lớp: </p>
                            <TextField label="Lớp" className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>File đánh giá của giảng viên: </p>
                            <TextField label="Cù Việt Dũng<Nguyễn Đức Tâm>.docx" className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Tên giảng viên: </p>
                            <TextField label="Cù Việt Dũng" className={styles.txtField} disabled />
                        </div>
                    </form>
                </div>
                <div className={styles.btn}>
                    <button className={styles.button} onClick={handleOpen} >Đồng ý</button>
                    <button className={styles.button} onClick={handleOpen} >Từ chối</button>
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
                        <button className={styles.button}  onClick={handleGo}>Có</button>
                        <button className={styles.button}  onClick={handleClose}>Không</button>
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
                        <AlertTitle>Tạo tài khoản giáo viên làm đồ án thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ChiTietXD;
