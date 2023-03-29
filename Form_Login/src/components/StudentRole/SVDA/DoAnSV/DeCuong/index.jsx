import React, { useContext, useRef } from "react";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import graduationThesis from "../../../../../api/graduationThesis";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";
import styles from './DeCuong.module.css';
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
                <div className={styles.container}>
                    <div className={styles.container_title}>
                        <h1 className={styles.title}><b>Nộp đề cương</b></h1>
                    </div>
                    <div style={{ height: '94%', }}>
                        <div className={styles.container_addfile}>
                            <div style={{ width: '100%'}}>
                                <h1 className={styles.addfile_title}><b>Đề cương của bạn:</b></h1>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className ={styles.box_addfile}>
                                <input 
                                    type="file"
                                    name="file"
                                    accept=".pdf"
                                    hidden
                                    ref={inputRef}
                                    onChange={handleChange}
                                    />
                                    { filePDF &&
                                        <div className={styles.file}>
                                            <h4>{filePDF.name}</h4>
                                            {/* <embed src={filePDF} type="application/pdf"/> */}
                                        </div>
                                    }
                                    <Button 
                                        onClick={handleClick}
                                        variant="outlined"
                                        color="inherit"
                                        className={styles.button}
                                        startIcon={<AddIcon />}
                                    >Nộp đề cương</Button>
                                    
                                </div>
                                <div style={{ height: '10%', }}>
                                    <Button variant="contained" style={{backgroundColor:'#23434E'}} onClick={onSubmit}>Lưu</Button>
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