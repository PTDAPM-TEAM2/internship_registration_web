import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import graduationThesis from "../../../../../api/graduationThesis";

const DC = () => {
    const token = localStorage.getItem('token');
    const inputRef = useRef();
    const [pdfFile, setPDFFile] = React.useState(null);
    const handleClick = () => {
        inputRef.current.click();
    }
    const handleChange = (e) => {
        console.log(e.target.files[0]);
        setPDFFile(e.target.files[0]);
    }
    const onSubmit = async () => {
        try {
            const response = await graduationThesis.insertPDF(pdfFile,token);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <div style={{ borderStyle: "solid", borderWidth: '2px', width: '100%', height: 550, marginTop: 30, marginLeft: 8, marginRight: 8  }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Đăng ký đồ án</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{ backgroundColor: "lightgrey", marginLeft: 70,marginRight: 70,marginTop:40, height: '83%' }}>
                            <div style={{ width: '100%' }}>
                                <h3>Đề cương của bạn:</h3>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div style={{ height: '90%', marginTop: 20, marginBottom: 180, textAlign: 'center' }}>
                                <input
                                    type="file"
                                    name="file"
                                    hidden
                                    ref={inputRef}
                                    onChange={handleChange}
                                    />
                                    <Button
                                        onClick={handleClick}
                                        variant="outlined"
                                        color="inherit"
                                        sx={{ width: 700, height: 120 }}
                                        startIcon={<AddIcon />}
                                    >Nộp đề cương</Button>
                                </div>
                                <div style={{ height: '10%', }}>
                                    <Button variant="contained" color="success" onClick={onSubmit}>Lưu</Button>
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