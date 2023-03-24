import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import graduationThesis from "../../../../../api/graduationThesis";
// import { Document, Page,PDFViewer } from '@react-pdf/renderer';

const DC = () => {
    const token = localStorage.getItem('token');
    const inputRef = useRef();
    const [filePDF, setFilePDF] = React.useState(null);
    const formData = new FormData();
    const handleClick = () => {
        inputRef.current.click();
    }
    const handleChange = (e) => {
        const files = e.target.files[0];
        setFilePDF(files);
    }
    formData.append('file', filePDF);
    console.log(formData);
    const onSubmit = async () => {
        try {
            const response = await graduationThesis.insertPDF({
                "file": formData,
            },token);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    // const MyDocument = ({ file }) => (
    //     <Document file={file}>
    //       <Page size="A4">
    //       </Page>
    //     </Document>
    //   );
    
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
                                        <div style={{borderStyle: "solid", borderWidth: '2px',borderRadius:5,width:700,marginTop:10,textAlign:"center"}}>
                                            <h4>{filePDF.name}</h4>
                                        </div>
                                        // <PDFViewer>
                                        //     <MyDocument file={filePDF} />
                                        // </PDFViewer>
                                    }
                                    <Button 
                                        onClick={handleClick}
                                        variant="outlined"
                                        color="inherit"
                                        sx={{ width: 700, height: 120,textAlign:"center" }}
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