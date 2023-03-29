import React, { useContext } from "react";
import { TextField, Box, } from "@mui/material";
import userApi from "../../../../../api/authApi";
import graduationThesis from "../../../../../api/graduationThesis";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";
import styles from './ThongTinDA.module.css';

const styleTextField = {
    width: '80%',
    marginBottom: 2,
}

function TTDA() {

    const token = localStorage.getItem('token');
    const [TTDA,setTTDA] = React.useState([]);
    const context = useContext(ThemeContext);
    const [showAlert, setShowAlert] = React.useState(null);

    React.useEffect(() => {
        const getTTDASV = async () => {
            context.updateLoading(true);
            try{
                const response = await graduationThesis.importExcelSvDa(token);
                setTTDA(response);
                context.updateLoading(false);
                console.log(TTDA)
            }catch(error){
                setShowAlert({ type: 'error', text: 'Có lỗi xảy ra' + error });
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
            }
        }
        getTTDASV();
    },[]);

    return (
        <>
            <AlertMessage message={showAlert} />
            <Box sx={{ display: "flex" }}>
                <div className={styles.container}>
                    <div className={styles.container_title}>
                        <h1 className={styles.title}><b>Thông tin đồ án</b></h1>
                    </div>
                    <div className={styles.container_textfield}>
                        <div>
                            <h2 className={styles.title_da}><b>Đồ án: {TTDA?.graduationThesis?.nameGraduationThesis}</b></h2>
                        </div>
                        <div className={styles.container_textfield}>
                            <div className={styles.items_column}>
                                <h4>Giáo viên hướng dẫn:</h4>
                                <TextField 
                                    disabled 
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    className={styles.textfield} 
                                    value={TTDA?.graduationThesis?.lecturer?.fullName || ""}
                                />
                                <h4>Lớp:</h4>
                                <TextField 
                                    disabled 
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    className={styles.textfield} value={TTDA?.grade?.name || ""}
                                />
                                <h4>Mã sinh viên:</h4>
                                <TextField 
                                    disabled 
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    className={styles.textfield} value={TTDA?.id || ""}
                                />
                                <h4>Kỳ:</h4>
                                <TextField 
                                    disabled 
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    className={styles.textfield} value={TTDA?.graduationThesis?.semeste?.code || ""}
                                />
                            </div>
                            <div className={styles.items_column}>
                                <h4>Sinh viên thực hiện:</h4>
                                <TextField 
                                    disabled
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    className={styles.textfield}   
                                    value={TTDA?.fullName || ""}
                                />
                                <h4>Khoa:</h4>
                                <TextField 
                                    disabled 
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    className={styles.textfield} 
                                    value={TTDA?.grade?.name || ""}
                                />
                                <h4>Điểm:</h4>
                                <TextField 
                                    disabled    
                                    id="outlined-basic" 
                                    variant="outlined" 
                                    className={styles.textfield} 
                                    value={TTDA?.graduationThesis?.avgMark || ""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default TTDA;