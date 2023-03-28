import React, { useContext, useRef, useState } from "react";
import { TextField, Button, Autocomplete, Box, Modal, Typography, MenuItem, } from "@mui/material";
import lecturerApi from "../../../../../api/lecturerApi";
import userApi from "../../../../../api/authApi";
import graduationThesis from "../../../../../api/graduationThesis";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";
import imageDoAn from '../../../../../images/doAn.png';
import * as yup from "yup";
import { Formik, useFormik } from "formik";
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
    giaoVien: null
}


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
    const [emptyField, setEmptyField] = React.useState(false);

    const token = localStorage.getItem('token');
    const [lecturers, setLecturer] = React.useState([]);
    const [giaovien, setGiaoVien] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [errorMessages, setErrorMessages] = useState("");

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

    const onClick = async (values) => {
        const dateNow = moment(new Date());
        console.log(values.giaoVien);
        context.updateLoading(true);
        try {
            if((formik.values.tenDoAn === "" || formik.values.tenDoAn === " ") && values.giaoVien === null){
                context.updateLoading(false);
                setEmptyField(true);
                setErrorMessages("Hãy điền đầy đủ thông tin");
                setOpen(true);
            }else if(values.giaovien === null){
                context.updateLoading(false);
                setErrorMessages("Chưa chọn giáo viên hướng dẫn");
                setOpen(true);
            }else if(formik.values.tenDoAn === "" || formik.values.tenDoAn === " "){
                context.updateLoading(false);
                setEmptyField(true);
                setErrorMessages("Trường đề tài là bắt buộc");
                setOpen(true);
            }else if(dateNow.isBefore(getTime.timeStart) || dateNow.isAfter(getTime.timeEnd)){
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
                        "nameGraduationThesis": values.tenDoAn,
                        "student": {
                            "id": user.id
                        },
                        "lecturer": {
                            "id": values.giaoVien.id
                        },
                        "semester": {
                            "id": user?.semester?.id
                        }
                    },token);
                    context.updateLoading(false);
                    setShowAlert({ type: 'success', text: 'Đăng ký đồ án thành công' });
                    setTimeout(() => {
                        setShowAlert(null);
                    }, 5000)
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
        initialValues: initialValues,
        // validationSchema: validationSchema,
        onSubmit: onClick,
    })

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formattedTime = moment(date).format('hh:mm A');
        return day + "/" + month + "/" + year + " " + formattedTime;
    }

    return (
            <Box style={{display: "flex"}}>
                <div className={styles.container}>
                    <div className={styles.container_title}>
                        <h1 className={styles.title}><b>Đăng ký đồ án</b></h1>
                    </div>
                    <div style={{ height: '94%', }}>
                        <div className={styles.container_date}>
                            <h4>Ngày bắt đầu: {transferDate(getTime.timeStart)}</h4>
                            <h4>Ngày kết thúc: {transferDate(getTime.timeEnd)}</h4>
                        </div>
                        <form className={styles.container_register} onSubmit={formik.handleSubmit}>
                            <div className={styles.image}>
                                <img src={imageDoAn} alt="" />
                            </div>
                            <div className={styles.box_register}>
                                <div className={styles.register}>
                                    <h4>Đề tài:</h4>
                                    <TextField 
                                        variant="outlined"
                                        name="tenDoAn"
                                        className={styles.text_field}
                                        style = {emptyField === true ? {'border':'1px solid red', 'borderRadius' : '5px'} : {}}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            if (e.target.value === "" || e.target.value === " ") {
                                                setEmptyField(true);
                                            }else{
                                                setEmptyField(false);
                                            }
                                        }}
                                        value={formik.values.tenDoAn}
                                        error={formik.touched.tenDoAn && Boolean(formik.errors.tenDoAn)}
                                        onBlur={formik.handleBlur}
                                    />
                                    <h4>Giáo viên hướng dẫn:</h4>
                                    {/* <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%', marginBottom: 5 }} /> */}
                                    <TextField
                                        name="giaoVien"
                                        select
                                        onChange={formik.handleChange}
                                        className={styles.text_field}
                                        value={formik.values.giaoVien}
                                        helperText={formik.touched.giaoVien && formik.errors.giaoVien} 
                                        error={formik.touched.giaoVien && Boolean(formik.errors.giaoVien)}
                                    >
                                        {lecturers.map((option) => (
                                            <MenuItem key={option.id} value={option}>
                                                {option.fullName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div style={{ height: '40%', }}>
                                    <button className={styles.button} type="submit">Đăng ký</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <AlertMessage message={showAlert} />
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
            </Box>
            
    );
}

export default DKDA;