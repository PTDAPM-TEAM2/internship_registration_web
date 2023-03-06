import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemSV.module.css';
import Sidebar from '../../Sidebar';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ThemSV = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [date, setDate] = React.useState(dayjs());

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert(true);
        setTimeout(() => {
            navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da');
        }, 1000)
    }
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thêm Sinh Viên</p>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formAccount}>
                            <div>
                                <div className={styles.txt}>
                                    {(imageFile === null) &&
                                        <div>
                                            <label htmlFor="file" className={styles.upload} >
                                                <FileUploadIcon />
                                                <span>Tải lên</span>
                                            </label>
                                            <input className={styles.fileInput} name='file' id='file' type="file" accept=".jpg, .jpeg, .png" onChange={handleImageFileChange} />
                                        </div>
                                    }
                                    {
                                        imageFile &&
                                        <div className={styles.image}>
                                            <img src={imageUrl} alt='avatar' style={{ maxWidth: '100%' }}/>
                                        </div>
                                    }
                                </div>
                                <div className={styles.txt}>
                                    <p>Giới tính: </p>
                                    <TextField />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt}>
                                    <p>Họ tên: </p>
                                    <TextField className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số căn cước: </p>
                                    <TextField className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Ngày sinh: </p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} style={{ width: 400 }} />}
                                            value={date}
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
                                    <TextField className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Số điện thoại: </p>
                                    <TextField className={styles.txtField} />
                                </div>
                                <div className={styles.txt}>
                                    <p>Email: </p>
                                    <TextField className={styles.txtField} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã sinh viên: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Lớp: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Khoa: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                            <div className={styles.txt}>
                                <p>Kỳ: </p>
                                <TextField className={styles.txtFieldBot} />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} style={{ color: 'white' }}>Thêm</button>
                        </div>
                    </form>
                </div>

            </div>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Thêm thông tin sinh viên thành công !</AlertTitle>
                    </Alert>
                </div>}
        </div>
    );
};

export default ThemSV;
