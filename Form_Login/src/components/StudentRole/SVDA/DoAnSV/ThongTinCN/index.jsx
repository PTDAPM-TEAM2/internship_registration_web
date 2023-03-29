import React, { useContext } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import userApi from "../../../../../api/authApi";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";
// import userApi from "../../api/authApi";
import styles from './TTCN.module.css';

const styleTextField = {
    width: '80%',
    marginBottom: 3,
};


function TTSV() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/sinh-vien-do-an/thong-tin-sinh-vien/thay-doi-mat-khau');
    }
    // var studentInfo = await userApi.getInfo();
    const token = localStorage.getItem('token');
    const [SV, setSV] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(null);
    const context = useContext(ThemeContext);

    React.useEffect(() => {
        const getDataSV = async () => {
            context.updateLoading(true);
            try {
                const response = await userApi.getInfo(token);
                context.updateLoading(false);
                setSV(response);
                console.log(SV)

            } catch (error) {
                setShowAlert({ type: 'error', text: 'Có lỗi xảy ra' + error });
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
            }
        }
        getDataSV();
    }, []);

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }

    return (
        <>
            <AlertMessage message={showAlert} />
            <Box sx={{ display: 'flex' }}>
                <div className={styles.container}>
                    <div className={styles.container_info1}>
                        <div className={styles.container_tittle}>
                            <h1 className={styles.title}><b>Thông tin cá nhân</b></h1>
                        </div>
                        <div className={styles.box_textfield}>
                            <div className={styles.column_avatar}>
                                <img src={SV?.urlImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="avatar" className={styles.avatar} />
                                <h4 style={{ marginBottom: 2 }}>Giới tính:</h4>
                                <TextField disabled
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    sx={{ width: '80%', }}
                                    value={SV?.gender || ""} />
                            </div>
                            <div className={styles.column_textfield}>
                                <h4 className={styles.label}>Họ và tên:</h4>
                                <TextField disabled
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    className={styles.text_field}
                                    value={SV?.fullName || ""} />
                                <h4 className={styles.label}>Ngày sinh:</h4>
                                <TextField disabled
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    className={styles.text_field}
                                    value={transferDate(SV?.dateOfBirth) || ""} />
                                <h4 className={styles.label}>Số điện thoại:</h4>
                                <TextField disabled
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    className={styles.text_field}
                                    value={SV?.phoneNumber || ""} />
                            </div>
                            <div className={styles.column_textfield}>
                                <h4 className={styles.label}>Căn cước:</h4>
                                <TextField disabled
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    className={styles.text_field}
                                    value={SV?.idNumber || ""} />
                                <h4 className={styles.label}>Nơi sinh:</h4>
                                <TextField disabled
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    className={styles.text_field}
                                    value={SV?.placeOfBitrh || ""} />
                                <h4 className={styles.label}>Email:</h4>
                                <TextField disabled
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    className={styles.text_field}
                                    value={SV?.email || ""} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.container_info2}>
                        <div className={styles.column_textfield1}>
                            <h4 className={styles.label}>Mã sinh viên:</h4>
                            <TextField disabled
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                className={styles.text_field}
                                value={SV?.studentCode || ""} />
                        </div>
                        <div className={styles.column_textfield1}>
                            <h4 className={styles.label}>Lớp:</h4>
                            <TextField disabled
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                className={styles.text_field}
                                value={SV?.grade?.name || ""} />
                        </div>
                        <div className={styles.column_textfield1}>
                            <h4 className={styles.label}>Mật khẩu:</h4>
                            <TextField disabled
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                className={styles.text_field}
                                defaultValue="***************" />
                        </div>
                    </div>
                    <div style={{ textAlign: "right", }}>
                        <Button variant="contained" style={{ backgroundColor: '#23434E' }} onClick={handleClick}>Đổi mật khẩu</Button>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default TTSV;