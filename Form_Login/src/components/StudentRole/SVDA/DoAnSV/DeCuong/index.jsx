import React, { useContext, useRef } from "react";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import graduationThesis from "../../../../../api/graduationThesis";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";
// import { Document, Page,PDFViewer } from '@react-pdf/renderer';

const DC = () => {
    const token = localStorage.getItem('token');
    const inputRef = useRef();
    const [filePDF, setFilePDF] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState(null);
    
    const context = useContext(ThemeContext);
    const handleClick = () => {
        inputRef.current.click();
    }
    const handleChange = (e) => {
        const files = e.target.files[0];
        setFilePDF(files);
    }
    const onSubmit = async () => {
        context.updateLoading(true);
        try {
            const response = await graduationThesis.insertPDF({
                file:filePDF
            },token);
            context.updateLoading(false);
            setShowAlert({ type: 'success', text: "Nộp đề cương thành công" });
            setTimeout(() => {
                setShowAlert(null);
            }, 2000)
        } catch (error) {
            context.updateLoading(false);
            setShowAlert({ type: 'error', text: "Nộp đề cương thất bại " + error });
            setTimeout(() => {
                setShowAlert(null);
            }, 2000)
        }
    }
    
    return (
        <>
            <AlertMessage message={showAlert} />
            <Box sx={{ display: 'flex' }}>
                <div style={{ borderStyle: "solid", borderWidth: '2px', width: '100%', height: 550, marginTop: 30, marginLeft: 8, marginRight: 8  }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Đăng ký đồ án</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{ background: '#FFFCFC',boxShadow: "inset 3px 3px 20px rgba(0, 0, 0, 0.3)", marginLeft: 70,marginRight: 70,marginTop:40, height: '83%' }}>
                            <div style={{ width: '100%' }}>
                                <h3>Đề cương của bạn:</h3>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div style={{ height: '90%', marginTop: 20, marginBottom: 180, alignItems:"center",display:"flex",flexFlow:"column",justifyContent:"center" }}>
                                <input 
                                    type="file"
                                    name="file"
                                    accept=".pdf"
                                    hidden
                                    ref={inputRef}
                                    onChange={handleChange}
                                    />
                                    { filePDF &&
                                        <div style={{borderStyle: "solid", borderWidth: '2px',borderRadius:5,width:'75%',marginTop:10,textAlign:"center"}}>
                                            <h4>{filePDF.name}</h4>
                                            {/* <embed src={filePDF} type="application/pdf"/> */}
                                        </div>
                                    }
                                    <Button 
                                        onClick={handleClick}
                                        variant="outlined"
                                        color="inherit"
                                        sx={{ width: '75%', height: 120,textAlign:"center" }}
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