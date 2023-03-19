import React from "react";
import { Avatar, TextField } from "@mui/material";
import { Box } from "@mui/system";

const styleTextField = {
    width: '80%', marginBottom: 1
};

const styleH4 ={
    marginBottom: 10
};

function TTTT() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 550, marginTop: 30, marginLeft: 8, marginRight: 8  }}>
                    <div style={{ borderBottom: '2px ', width: '100%', height: '60%', boxSizing: 'border-box' }}>
                        <div style={{ height: '10%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: "lightgrey" }}>
                            <h1>Thông tin cá nhân</h1>
                        </div>
                        <div style={{ height: '90%', borderBottom: '2px', marginTop: 20, textAlign: 'left', marginLeft: 50, marginRight: 10 }}>
                            <div style={{ float: 'left', width: '20%', height: '100%' }}>
                                <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" sx={{ width: 161, height: 161, marginBottom: 0.4 }}></Avatar>
                                <h4 style={styleH4}>Giới tính:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', }} />
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%' }}>
                                <h4 style={styleH4}>Họ và tên:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <h4 style={styleH4}>Ngày sinh:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <h4 style={styleH4}>Số điện thoại:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%' }}>
                                <h4 style={styleH4}>Căn cước:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <h4 style={styleH4}>Nơi sinh:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                <h4 style={styleH4}>Email:</h4>
                                <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px groove', width: '100%', height: '40%', boxSizing: 'border-box' }}>
                        <div style={{ display: 'block', height: '100%' }}>
                            <div style={{ width: "100%", height: '100%', textAlign: 'left', marginLeft: 50, marginRight: 10 }}>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={styleH4}>Mã sinh viên:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                    <h4 style={styleH4}>Vị trí thực tập:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                </div>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={styleH4}>Lớp:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                    <h4 style={styleH4}>Tên công ty:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                </div>
                                <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                    <h4 style={styleH4}>Khoa:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                    <h4 style={styleH4}>Mã công ty:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default TTTT;