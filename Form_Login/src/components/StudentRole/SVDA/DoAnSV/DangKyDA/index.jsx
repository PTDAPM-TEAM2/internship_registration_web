import React from "react";
import { TextField, Button, Autocomplete, Box } from "@mui/material";

const DKDA = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 600, marginTop: 30, marginLeft: 8, marginRight: 8 }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Đăng ký đồ án</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{height:'13%',display:'flex',justifyContent:'end',flexFlow:'column',alignItems:"end",marginRight:300}}>
                            <h4>Ngày bắt đầu:</h4>
                            <h4>Ngày kết thúc</h4>
                        </div>
                        <div style={{ border: '2px dashed',marginTop:5,marginLeft:70,marginRight:70, height: '77%' }}>
                            <div style={{ float: 'left', width: '50%' }}>
                                <img src="../../../Vector.png" alt="" />
                            </div>
                            <div style={{ float: 'left', width: '50%' }}>
                                <div style={{ height: '90%', marginTop: 20, marginBottom: 80, textAlign: 'left ', marginLeft: 50 }}>
                                    <h4>Đề tài:</h4>
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} />
                                    <h4>Giáo viên hướng dẫn:</h4>
                                    {/* <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} /> */}
                                    <Autocomplete disablePortal
                                        id="giao_vien"
                                        options={[{ gv: 'Nguyễn Văn A' }, { gv: 'Phạm Thị B' }]}
                                        sx={{ width: '80%', marginBottom: 5 }}
                                        renderInput={(params) => <TextField {...params} label="GV" />}
                                    />
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

export default DKDA;