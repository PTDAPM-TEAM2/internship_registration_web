import React from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import userApi from "../../../../../api/authApi";
// import userApi from "../../api/authApi";
// import styles from './TTCN.module.css';

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
    React.useEffect(() => {
        const getDataSV = async () => {
            try{
                const response = await userApi.getInfo(token);
                setSV(response);
                console.log(SV)
              
            }catch(err){
                console.log('Error fetching data', err);
            }
        }
        getDataSV();
    },[]);

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 550, marginTop: 20, marginLeft: 8, marginRight: 8 }}>
                    <div style={{ borderBottom: '2px ', width: '100%', height: '60%', boxSizing: 'border-box' }}>
                        <div style={{ height: '10%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: "lightgrey" }}>
                            <h1>Thông tin cá nhân</h1>
                        </div>
                        <div style={{ height: '90%', borderBottom: '2px', marginTop: 10, textAlign: 'left', marginLeft: 50, marginRight: 10 }}>
                            <div style={{ float: 'left', width: '20%', height: '100%' }}>
                                <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" sx={{ width: 161, height: 161, marginBottom: 0.3 }}></Avatar>
                                <h4 style={{ marginBottom: 2 }}>Giới tính:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', }} value={SV?.gender || ""}/>
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%' }}>
                                <h4 style={{ marginBottom: 10 }}>Họ và tên:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV?.fullName || ""}/>
                                <h4 style={{ marginBottom: 10 }}>Ngày sinh:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={transferDate(SV?.dateOfBirth )|| ""}/>
                                <h4 style={{ marginBottom: 10 }}>Số điện thoại:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV.phoneNumber}/>
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%' }}>
                                <h4 style={{ marginBottom: 10 }}>Căn cước:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV?.idNumber || ""}/>
                                <h4 style={{ marginBottom: 10 }}>Nơi sinh:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV?.placeOfBirth || ""}/>
                                <h4 style={{ marginBottom: 10 }}>Email:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV?.email || ""}/>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px groove', width: '100%', height: '40%', boxSizing: 'border-box' }}>
                        <div style={{ display: 'block', height: '100%' }}>
                            <div style={{ width: "100%", height: '100%', textAlign: 'left', marginLeft: 50, marginRight: 10 }}>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={{ marginBottom: 10 }}>Mã sinh viên:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV?.studentCode || ""}/>
                                    <h4 style={{ marginBottom: 10 }}>Mật khẩu:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField}/>
                                </div>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={{ marginBottom: 10 }}>Lớp:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV?.grade?.name || ""}/>
                                </div>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={{ marginBottom: 10 }}>Khoa:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" size="small" style={styleTextField} value={SV?.grade?.name || ""}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "right", }}>
                        <Button variant="contained" color="success" onClick={handleClick}>Đổi mật khẩu</Button>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default TTSV;