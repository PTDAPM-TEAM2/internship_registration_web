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
                    <p className={styles.title}>Th??ng tin chi ti???t sinh vi??n</p>
                    <form>
                        <div className={styles.formAccount}>
                            <div>
                                <div className={styles.txt}>
                                    <div className={styles.image}>
                                        <img src="" alt='avatar' style={{ maxWidth: '100%' }} />
                                    </div>
                                </div>
                                <div className={styles.txt}>
                                    <p>Gi???i t??nh: </p>
                                    <TextField defaultValue={state.item.gt} required />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt}>
                                    <p>H??? t??n: </p>
                                    <TextField defaultValue={state.item.Hoten} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>S??? c??n c?????c: </p>
                                    <TextField defaultValue={state.item.SoCC} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Ng??y sinh: </p>
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} style={{ width: 400 }} />}
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            format="YYYY/MM/DD"
                                            defaultValue={dayjs()}
                                        />
                                    </LocalizationProvider> */}
                                    <TextField defaultValue={state.item.NgaySinh} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>N??i sinh: </p>
                                    <TextField defaultValue={state.item.NoiSinh} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>S??? ??i???n tho???i: </p>
                                    <TextField defaultValue={state.item.SDT} className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Email: </p>
                                    <TextField defaultValue={state.item.email} className={styles.txtField} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>M?? sinh vi??n: </p>
                                <TextField defaultValue={state.item.Ma} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>L???p: </p>
                                <TextField defaultValue={state.item.Lop} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>K???: </p>
                                <TextField defaultValue={state.item.Ky} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>M???t kh???u: </p>
                                <TextField defaultValue={state.item.Mk} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>T??n ????? t??i ????? ??n: </p>
                                <TextField defaultValue={state.item.TenDoAn} className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Gi???ng vi??n h?????ng d???n: </p>
                                <TextField defaultValue={state.item.GiangVien} className={styles.txtFieldBot} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <Button className={styles.button} onClick={handleSubmit}>S???a</Button>
                            <Button className={styles.button} onClick={() => { handleDelete(state.item)}}>X??a</Button>
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
                        C?? mu???n x??a kh??ng ?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                        <button className={styles.button} sx={{ color: 'white' }} onClick={handleGo}>C??</button>
                        <button className={styles.button} sx={{ color: 'white' }} onClick={handleClose}>Kh??ng</button>
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
                        <AlertTitle>S???a th??ng tin sinh vi??n th??nh c??ng !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ChiTietSV;
