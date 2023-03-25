import React, { useContext, useRef } from "react";
import { TextField, Button, Autocomplete, Box, } from "@mui/material";
import lecturerApi from "../../../../../api/lecturerApi";
import userApi from "../../../../../api/authApi";
import graduationThesis from "../../../../../api/graduationThesis";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";

const user = {
    fullName: null,
    id: null,
    semester: null,
}
const getTime ={
    timeStart: null,
    timeEnd: null,
}
const DKDA = () => {
    const [showAlert, setShowAlert] = React.useState(null);
    const context = useContext(ThemeContext);
    

    const token = localStorage.getItem('token');
    const [lecturers, setLecturer] = React.useState([]);
    const [giaovien, setGiaoVien] = React.useState(null);
    const inputDA = useRef();

    React.useEffect(() => {
        const getCurrentUser = async () => {
            try{
                const response = await userApi.getInfo(token);
                return response;
            }catch(err){
                console.log('Error fetching data', err);
            }
        }
        const getRegTime = async () => {
            try{
                const response = await graduationThesis.getRegTime(token);
                console.log(response);
                return response;
            }catch(err){
                console.log('Error fetching data', err);
            }
        }
        getCurrentUser().then(data => {
            user.fullName = data.fullName;
            user.id = data.id;
            user.semester = data?.graduationThesis?.semester;
        });
        getRegTime().then(data => {
            getTime.timeStart = data.timeStart;
            getTime.timeEnd = data.timeEnd;
        });
        const getTTDASV = async () => {
            context.updateLoading(true);
            try{
                const responseGV = await lecturerApi.getAllGV({
                    "fullName": user.fullName,
                },token);
                context.updateLoading(false);
                setLecturer(responseGV);
            }catch(error){
                setShowAlert({ type: 'error', text: 'Có lỗi xảy ra' + error });
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
            }
        }
        getTTDASV();
    },[]);

    const handleChange = (event, value) => {
        setGiaoVien(value);
    }

    const onClick = async () => {
        const dateNow = new Date();
        if(dateNow < getTime.timeStart || dateNow > getTime.timeEnd){
            console.log("Vuot qua thoi gian nop de cuong");
                
        }else{
            context.updateLoading(true);
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
                    },token).then(response => {
                        if(response.status === 200){
                            setShowAlert({ type: 'success', text: 'Đăng ký đồ án thành công' });
                            setTimeout(() => {
                                setShowAlert(null);
                            }, 2000)
                        }
                    });
                    context.updateLoading(false);
                    console.log(response);
            } catch (error) {
                context.updateLoading(false);
                setShowAlert({ type: 'error', text: 'Đăng ký đồ án ko thành công ' + error });
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
            }
        }
    }

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }

    return (
        <div>
            <AlertMessage message={showAlert} />
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 600, marginTop: 30, marginLeft: 8, marginRight: 8 }}>
                    <div style={{ height: '5%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1>Đăng ký đồ án</h1>
                    </div>
                    <div style={{ height: '95%', }}>
                        <div style={{height:'13%',display:'flex',justifyContent:'end',flexFlow:'column',alignItems:"end",marginRight:300}}>
                            <h4>Ngày bắt đầu: {transferDate(getTime.timeStart)}</h4>
                            <h4>Ngày kết thúc: {transferDate(getTime.timeEnd)}</h4>
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
            </Box>
        </div>
    );
}

export default DKDA;