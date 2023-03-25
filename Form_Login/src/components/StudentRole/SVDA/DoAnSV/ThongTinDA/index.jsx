import React from "react";
import { TextField, Box, } from "@mui/material";
import userApi from "../../../../../api/authApi";
import graduationThesis from "../../../../../api/graduationThesis";
const styleTextField = {
    width: '80%',
    marginBottom: 2,
}

function TTDA() {

    const token = localStorage.getItem('token');
    const [TTDA,setTTDA] = React.useState([]);

    React.useEffect(() => {
        const getTTDASV = async () => {
            try{
                const response = await graduationThesis.importExcelSvDa(token);
                setTTDA(response);
                console.log(TTDA)
              
            }catch(err){
                console.log('Error fetching data', err);
            }
        }
        getTTDASV();
    },[]);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <div style={{ display: 'block', top: '10%', borderStyle: "solid", borderWidth: '2px', width: '100%', height: 550, marginLeft: 8, marginTop: 30, marginRight: 8  }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Thông tin đồ án</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{ margin: 20, height: '83%' }}>
                            <div>
                                <h2 style={{}}>Đồ án: {TTDA?.graduationThesis?.nameGraduationThesis}</h2>
                            </div>
                            <div style={{ marginTop: 20, marginLeft: 120, textAlign: "left" }}>
                                <div style={{ float: 'left', width: '50%', }}>
                                    <h4>Giáo viên hướng dẫn:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" sx={styleTextField} value={TTDA?.graduationThesis?.lecturer?.fullName || ""}/>
                                    <h4>Lớp:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" sx={styleTextField} value={TTDA?.grade?.name || ""}/>
                                    <h4>Mã sinh viên:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" sx={styleTextField} value={TTDA?.id || ""}/>
                                    <h4>Kỳ:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" sx={styleTextField} value={TTDA?.graduationThesis?.semeste?.code || ""}/>
                                </div>
                                <div style={{ float: 'left', width: '50%', }}>
                                    <h4>Sinh viên thực hiện:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" sx={styleTextField} value={TTDA?.fullName || ""}/>
                                    <h4>Khoa:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" sx={styleTextField} value={TTDA?.grade?.name || ""}/>
                                    <h4>Điểm:</h4>
                                    <TextField disabled id="outlined-basic" variant="outlined" sx={styleTextField} value={TTDA?.graduationThesis?.avgMark || ""}/>
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