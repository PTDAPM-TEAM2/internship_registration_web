import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link } from 'react-router-dom'
import styles from './QLSVTT.module.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import userApi from "../../../../api/studentApi";
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';

function QLSVTT() {
    const [startDate, setStartDate] = React.useState(dayjs());
    const [dueDate, setDueDate] = React.useState(dayjs());
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const getDate = dayjs();
    const context = useContext(ThemeContext);
    const token = localStorage.getItem('token');
    const handleClick = async () => {
        if (startDate < getDate) {
            setErrorMessage('Ngày không hợp lệ');
        }
        else if (startDate > dueDate) {
            setErrorMessage('Ngày không hợp lệ');
        }
        else {
            context.updateLoading(true);
            try {
                const response = await userApi.registerTimeTT({
                    timeStart: startDate,
                    timeEnd: dueDate,
                }, token);
                context.updateLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                context.updateLoading(false);
            }
            setErrorMessage('');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000)
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
                            format="DD/MM/YYYY"
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
                            format="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div style={{ backgroundColor: "none", height: 10 }}>
                {errorMessage && <p style={{ color: 'red', paddingTop: 20 }}>{errorMessage}</p>}
            </div>
            <div>
                <button className={`${styles.button} ${styles.btnSave}`} onClick={handleClick}>Cập nhập</button>
            </div>
            <div className={styles.btnFt}>
                <Link to='/quan-ly-sinh-vien-tt/du-lieu-sinh-vien-tt'>
                    <button className={`${styles.button} ${styles.btnXD}`}>Nhập dữ liệu sinh viên từ Excel</button>
                </Link>
                <Link to='/quan-ly-sinh-vien-tt/danh-sach-sinh-vien-tt'>
                    <button className={`${styles.button} ${styles.btnDS}`}>Danh sách sinh viên</button>
                </Link>
            </div>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'fixed',
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

export default QLSVTT