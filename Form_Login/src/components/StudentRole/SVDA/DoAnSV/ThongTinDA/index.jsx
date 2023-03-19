import React from "react";
import { TextField, Box, } from "@mui/material";

function TTDA() {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <div style={{ display: 'block', top: '10%', borderStyle: "solid", borderWidth: '2px', width: '100%', height: 550, marginLeft: 8, marginTop: 30, marginRight: 8  }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Thông tin đồ án</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{ margin: 50, height: '83%' }}>
                            <div>
                                <h2>Đồ án:</h2>
                            </div>
                            <div style={{ marginTop: 60, marginLeft: 120, textAlign: "left" }}>
                                <div style={{ float: 'left', width: '50%', }}>
                                    <h4>Giáo viên hướng dẫn:</h4>
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4>Lớp:</h4>
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4>Mã sinh viên:</h4>
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} />
                                </div>
                                <div style={{ float: 'left', width: '50%', }}>
                                    <h4>Sinh viên thực hiện:</h4>
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4>Khoa:</h4>
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4>Điểm:</h4>
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default TTDA;