import React, { useContext, useRef, useState } from "react";
import { TextField, Button, Autocomplete, Box, Modal, Typography, } from "@mui/material";
import lecturerApi from "../../../../../api/lecturerApi";
import userApi from "../../../../../api/authApi";
import graduationThesis from "../../../../../api/graduationThesis";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";
import imageDoAn from '../../../../../images/doAn.png';
import * as yup from "yup";
import { useFormik } from "formik";
import warningImage from '../../../../../images/warning.png';
import styles from "./DangKyDA.module.css";
import moment from 'moment';

const user = {
    fullName: null,
    id: null,
    semester: null,
}
const getTime ={
    timeStart: null,
    timeEnd: null,
}

const initialValues = {
    tenDoAn: '',
    giaoVien: ''
}

const validationSchema = yup.object().shape({
    tenDoAn: yup.string().required('Chưa điền đề tài đồ án'),
    giaoVien: yup.string().required('Chưa chọn giáo viên hướng dẫn'),
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DKDA = () => {
    const [showAlert, setShowAlert] = React.useState(null);
    const context = useContext(ThemeContext);
    

    const token = localStorage.getItem('token');
    const [lecturers, setLecturer] = React.useState([]);
    const [giaovien, setGiaoVien] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [errorMessages, setErrorMessages] = useState("");
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
            context.updateLoading(true);
            try {
                if(inputDA.current.value === "" && giaovien === null){
                    context.updateLoading(false);
                    setErrorMessages("Hãy điền đầy đủ thông tin");
                    setOpen(true);
                }else if(giaovien === null){
                    context.updateLoading(false);
                    setErrorMessages("Chưa chọn giáo viên hướng dẫn");
                    setOpen(true);
                }else if(inputDA.current.value === ""){
                    context.updateLoading(false);
                    setErrorMessages("Trường đề tài là bắt buộc");
                    setOpen(true);
                }else if(dateNow < getTime.timeStart || dateNow > getTime.timeEnd){
                    context.updateLoading(false);
                    setErrorMessages("Đã quá thời gian đăng ký đồ án");
                    setOpen(true);
                }
                else{
                    const response = await graduationThesis.addOrRemoveGraduation(
                        //pram like this {"isAccept":1,"status":0,"nameGraduationThesis":"web ban do an 2","student":{"id":5},"lecturer":{"id":2},"semester":{"id": 1}}
                        {
                            "isAccept": 1,
                            "status": 0,
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
                        context.updateLoading(false);
                        console.log(response);
                }
            } catch (error) {
                context.updateLoading(false);
                setShowAlert({ type: 'error', text: 'Đăng ký đồ án ko thành công '});
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
            }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: onClick,
    })

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formattedTime = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        return day + "/" + month + "/" + year + " " + formattedTime;
    }

    return (
        <div>
            <AlertMessage message={showAlert} />
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 600, marginTop: 30, marginLeft: 8, marginRight: 8 }}>
                    <div style={{ height: '6%', width: '100%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: 'lightgrey' }}>
                        <h1 style={{fontWeight:700, fontSize:25}}><b>Đăng ký đồ án</b></h1>
                    </div>
                    <div style={{ height: '94%', }}>
                        <div style={{height:'13%',display:'flex',justifyContent:'end',flexFlow:'column',alignItems:"end",marginRight:300}}>
                            <h4>Ngày bắt đầu: {transferDate(getTime.timeStart)}</h4>
                            <h4>Ngày kết thúc: {transferDate(getTime.timeEnd)}</h4>
                        </div>
                        <div style={{ border: '2px dashed',marginTop:5,marginLeft:70,marginRight:70, height: '77%' }}>
                            <div style={{ float: 'left', width: '50%', height:'98%'}}>
                                <img src={imageDoAn} alt="" />
                            </div>
                            <div style={{ float: 'left', width: '50%' }}>
                                <div style={{ height: '90%', marginTop: 20, marginBottom: 80, textAlign: 'left ', marginLeft: 50 }}>
                                    <h4>Đề tài:</h4>
                                    <TextField 
                                        id="outlined-basic" 
                                        variant="outlined" 
                                        sx={{ width: '80%', marginBottom: 5 }} 
                                        inputRef={inputDA} 
                                        // onChange={formik.handleChange}
                                        // onBlur={formik.handleBlur}
                                        // value={formik.values.tenDoAn}
                                        // error={formik.touched.tenDoAn && Boolean(formik.errors.tenDoAn)}
                                        // helperText={formik.touched.tenDoAn && formik.errors.tenDoAn}
                                        />
                                    <h4>Giáo viên hướng dẫn:</h4>
                                    {/* <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} /> */}
                                    <Autocomplete
                                        id="giao_vien"
                                        options={lecturers}
                                        getOptionLabel={(option) => option.fullName}
                                        onChange={handleChange}
                                        sx={{ width: '80%', marginBottom: 5 }}
                                        renderInput={(params) =>(
                                            <TextField {...params} 
                                                variant="outlined" 
                                                label="GV"
                                                // helperText={formik.touched.giaoVien && formik.errors.giaoVien} 
                                                // error={formik.touched.giaoVien && Boolean(formik.errors.giaoVien)}
                                            />
                                        )}
                                    />
                                </div>
                                <div style={{ height: '10%', }}>
                                    <Button variant="contained" style={{backgroundColor:'#23434E'}} onClick={onClick}>Đăng ký</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h3" style={{color: 'red', textAlign: 'center', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                            <img src={warningImage} alt="" style={{width: '25px', height: '25px', objectFit: 'cover', marginRight: '20px'}}/>{errorMessages}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                            <Button onClick={handleClose} className = {styles.button}>OK</Button>
                        </div>
                    </Box>
                </Modal>
        </div>
    );
}

export default DKDA;