import React from "react";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


const DC = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <div style={{ borderStyle: "solid", borderWidth: '2px', width: '100%', height: 550, marginTop: 30, marginLeft: 8, marginRight: 8  }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Đăng ký đồ án</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{ backgroundColor: "lightgrey", margin: 70, height: '83%' }}>
                            <div style={{ width: '100%' }}>
                                <h3>Đề cương của bạn:</h3>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div style={{ height: '90%', marginTop: 20, marginBottom: 220, textAlign: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        sx={{ width: 800, height: 120 }}
                                        startIcon={<AddIcon />}
                                    >Nộp đề cương</Button>
                                </div>
                                <div style={{ height: '10%', }}>
                                    <Button variant="contained" color="success">Lưu</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default DC;