import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link } from 'react-router-dom'
import styles from './QLDA.module.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function QLDA() {
    const [startDate, setStartDate] = React.useState(dayjs());
    const [dueDate, setDueDate] = React.useState(dayjs());
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const getDate = dayjs();
    const handleClick = () => {
        if (startDate < getDate) {
            setErrorMessage('Ngày không hợp lệ');
        }
        else if (startDate > dueDate) {
            setErrorMessage('Ngày không hợp lệ');
        }
        else {
            setErrorMessage('');
            setShowAlert(true);
        }

    }
    return (
        <div>
            <div className={styles.chooseDate}>
                <div className={styles.date}>
                    <p>Bắt đầu: </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <div className={styles.date}>
                    <p>Kết thúc: </p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            value={dueDate}
                            onChange={(newValue) => {
                                setDueDate(newValue);
                            }}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div style={{ backgroundColor: "none", height: 10 }}>
                {errorMessage && <p style={{ color: 'red', marginTop: 20 }}>{errorMessage}</p>}
            </div>
            <div>
                <button className={`${styles.button} ${styles.btnSave}`} onClick={handleClick}>Cập nhập</button>
            </div>
            <div className={styles.btnFt}>
                <Link to='/quan-ly-do-an/xet-duyet-do-an'>
                    <button className={`${styles.button} ${styles.btnXD}`}>Xét duyệt đồ án</button>
                </Link>
                <Link to='/quan-ly-do-an/danh-sach-do-an'>
                    <button className={`${styles.button} ${styles.btnDS}`}>Danh sách đồ án</button>
                </Link>
            </div>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Thiết lập thời gian đăng ký đồ án thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    )
}

export default QLDA