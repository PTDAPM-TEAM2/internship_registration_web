import React from "react";
import { TextField, Button, Box } from "@mui/material";


const TDMKTT = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: 'block', borderStyle: "solid", borderWidth: '2px', width: '100%', height: 550, marginTop: 30, marginLeft: 8, marginRight: 8 }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Đổi mật khẩu</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{ border: '2px dashed', margin: 40, height: '83%' }}>
                            <div style={{ float: 'left', width: '50%' }}>
                                <img src="../../../Vector.png" alt="" />
                            </div>
                            <div style={{ float: 'left', width: '50%' }}>
                                <div style={{ height: '90%', marginTop: 20, marginBottom: 10, textAlign: 'left ', marginLeft: 50 }}>
                                    <h4>Mật khẩu cũ:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4>Mật khẩu mới:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4>Nhập lại mật khẩu mới:</h4>
                                    <TextField id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', marginBottom: 5 }} />
                                </div>
                                <div style={{ height: '10%', }}>
                                    <Button variant="contained" color="success">Đăng ký</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default TDMKTT;