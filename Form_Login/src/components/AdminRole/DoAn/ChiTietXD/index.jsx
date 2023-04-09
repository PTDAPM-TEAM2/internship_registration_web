import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ChiTietXD.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';
import prjApi from "../../../../api/graduationThesis";
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
    const [status, setStatus] = React.useState(0);
    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const { id } = useParams();
    const handleClose = () => {
        setOpen(false);
        setStatus(0);
    };
    const handleOpen = (value) => {
        setOpen(true);
        setStatus(value);
    };
    const body = {
        id: state.item.id,
        status: status
    }
    const token = localStorage.getItem('token');
    const reviewGT = async () => {
        context.updateLoading(true);
        try {
            context.updateLoading(false);
            setOpen(false);
            setShowAlert(true);
            setTimeout(() => {
                navigate('/quan-ly-do-an/danh-sach-do-an');
            }, 1000)
            const response = await prjApi.addOrRemoveGraduation(body, token);
        }
        catch (err) {
            context.updateLoading(false);
            console.log(err);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.form}>
                <div style={{ width: '100%', border: '1px solid black' }}>
                    <p className={styles.title}>Xét duyệt đồ án</p>
                    <form className={styles.formInput}>
                        <div className={styles.txt}>
                            <p>Tên Sinh Viên: </p>
                            <TextField label={state.item.student.fullName} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Tên Đồ Án: </p>
                            <TextField label={state.item.nameGraduationThesis} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Mã Sinh Viên: </p>
                            <TextField label={state.item.student.studentCode} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Kỳ Đồ Án: </p>
                            <TextField label={state.item.semester.code} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Lớp: </p>
                            <TextField label={state.item.student.grade.name} className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>File đánh giá của giảng viên: </p>
                            <TextField label="File" className={styles.txtField} disabled />
                        </div>
                        <div className={styles.txt}>
                            <p>Tên giảng viên: </p>
                            <TextField label={context.cellValidateStudent(state.item.lecturer)} className={styles.txtField} disabled />
                        </div>
                    </form>
                </div>
                <div className={styles.btn}>
                    <Button className={styles.button} onClick={() => handleOpen(1)} >Đồng ý</Button>
                    <Button className={styles.button} onClick={() => handleOpen(2)} >Từ chối</Button>
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
                        <Button className={styles.button} onClick={reviewGT}>Có</Button>
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
                        <AlertTitle>Xác nhận yêu cầu thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ChiTietXD;
