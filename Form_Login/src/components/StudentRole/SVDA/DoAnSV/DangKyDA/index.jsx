import React, { useRef } from "react";
import { TextField, Button, Autocomplete, Box, Alert, AlertTitle } from "@mui/material";
import lecturerApi from "../../../../../api/lecturerApi";
import userApi from "../../../../../api/authApi";
import graduationThesis from "../../../../../api/graduationThesis";

var isSuccess = null;
const user = {
    fullName: null,
    id: null,
    semester: null,
}
const DKDA = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const token = localStorage.getItem('token');
    const [lecturers, setLecturer] = React.useState([]);
    const [giaovien, setGiaoVien] = React.useState(null);
    const inputDA = useRef();

    React.useEffect(() => {
        const getCurrentUser = async () => {
            try{
                const response = await userApi.getInfo(token);
                console.log(response);
                return response;
            }catch(err){
                console.log('Error fetching data', err);
            }
        }
        const data = getCurrentUser();
        user.fullName = data.fullName;
        user.id = data.id;
        user.semester = data?.graduationThesis?.semester;
        const getTTDASV = async () => {
            try{
                const responseGV = await lecturerApi.getAllGV({
                    "fullName": user.fullName,
                },token);
                setLecturer(responseGV);
            }catch(err){
                console.log('Error fetching data', err);
            }
        }

        getTTDASV();
    },[]);

    const handleChange = (event, value) => {
        setGiaoVien(value);
    }

    const onClick = async () => {
        console.log(giaovien.id);
        console.log(inputDA.current.value);
        try {
            const response = await graduationThesis.addOrRemoveGraduation(
                //pram like this {"isAccept":1,"status":0,"nameGraduationThesis":"web ban do an 2","student":{"id":5},"lecturer":{"id":2},"semester":{"id": 1}}
                {
                    "isAccept": 1,
                    "status": 1,
                    "nameGraduationThesis": inputDA.current.value,
                    "student": {
                        "id": user.id
                    },
                    "lecturer": {
                        "id": giaovien.id
                    },
                    "semester": {
                        "id": user?.semester?.id
                    }
                },token);
                isSuccess = true
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000)
        } catch (error) {
            console.log(error);
            isSuccess = false
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000)
        }
        
    }


    console.log(`log: ${lecturers}`)
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
                                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} inputRef={inputDA} />
                                    <h4>Giáo viên hướng dẫn:</h4>
                                    {/* <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} /> */}
                                    <Autocomplete
                                        id="giao_vien"
                                        options={lecturers}
                                        getOptionLabel={(option) => option.fullName}
                                        onChange={handleChange}
                                        sx={{ width: '80%', marginBottom: 5 }}
                                        renderInput={(params) =>(
                                            <TextField {...params} variant="outlined" label="GV" />
                                        )}
                                    />
                                </div>
                                <div style={{ height: '10%', }}>
                                    <Button variant="contained" color="success" onClick={onClick}>Đăng ký</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showAlert &&
                <div>
                    <Alert sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>{isSuccess ? "Đăng ký thành công":"Đăng ký thất bại"}</AlertTitle>
                    </Alert>
                </div>


            }
            </Box>
        </>
    );
}

export default DKDA;