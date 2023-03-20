import React from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

const styleTextField = {
    width: '80%', marginBottom: 5
};

function DKTT() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 700, marginTop: 30, marginLeft: 8, marginRight: 8  }}>
                    <div style={{ borderBottom: '2px ', width: '100%', height: '70%', boxSizing: 'border-box' }}>
                        <div style={{ height: '10%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: "lightgrey" }}>
                            <h1>Thông tin cá nhân</h1>
                        </div>
                        <div style={{ height: '90%', borderBottom: '2px', marginTop: 10, textAlign: 'left', marginLeft: 20, }}>
                            <div style={{ float: 'left', width: '20%', height: '100%' }}>
                                <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" sx={{ width: 161, height: 161, marginBottom: 5 }}></Avatar>
                                <h4 style={{ marginBottom: 10 }}>Giới tính:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', }} />
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%',}}>
                                <h4 style={{ marginBottom: 10 }}>Họ và tên:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <h4 style={{ marginBottom: 10 }}>Ngày sinh:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <div style={{width: "100%"}}>
                                    <div style={{float: 'left',}}>
                                        <h4 style={{ marginBottom: 10 }}>Số điện thoại:</h4>
                                        <TextField id="outlined-basic" variant="outlined" size="small" sx={{width: '100%', marginBottom: 5}} />
                                    </div>
                                    <div style={{position: 'relative',right: '-25%'}}>
                                        <h4 style={{ marginBottom: 10 }}>Khoa:</h4>
                                        <TextField id="outlined-basic" variant="outlined" size="small" sx={{width: '20%', marginBottom: 5}} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%' }}>
                                <h4 style={{ marginBottom: 10 }}>Nơi sinh:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <h4 style={{ marginBottom: 10 }}>Email:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <div style={{width: "100%"}}>
                                    <div style={{float: 'left'}}>
                                        <h4 style={{ marginBottom: 10 }}>Mã sinh viên:</h4>
                                        <TextField id="outlined-basic" variant="outlined" size="small" sx={{width: '100%', marginBottom: 5}} />
                                    </div>
                                    <div style={{position: 'relative',right: '-25%'}}>
                                        <h4 style={{ marginBottom: 10 }}>Lớp:</h4>
                                        <TextField id="outlined-basic" variant="outlined" size="small" sx={{width: '20%', marginBottom: 5}} />
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px groove', width: '100%', height: '30%', boxSizing: 'border-box' }}>
                        <div style={{ display: 'block', height: '100%' }}>
                            <div style={{ width: "100%", height: '100%', textAlign: 'left', marginLeft: 20, marginRight: 10 }}>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={{ marginBottom: 10 }}>Tên công ty:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4 style={{ marginBottom: 10 }}>Địa chỉ công ty:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                </div>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={{ marginBottom: 10 }}>Email công ty:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4 style={{ marginBottom: 10 }}>Vị trí thực tập:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                </div>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={{ marginBottom: 10 }}>SĐT công ty:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4 style={{ marginBottom: 10 }}>Mã công ty:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "right", }}>
                        <Button variant="contained" color="success" >Đăng ký</Button>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default DKTT;