import React, { useContext } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import userApi from "../../../../../api/authApi";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import studentApi from "../../../../../api/studentApi";
import { ThemeContext } from "../../../../Theme/Theme";
import AlertMessage from "./Alert";

const styleTextField = {
    width: '80%', marginBottom: 5
};

const validationSchema = yup.object().shape({
    nameCompany: yup.string().required("Vui lòng nhập tên công ty"),
    addressCompany: yup.string().required("Vui lòng nhập địa chỉ"),
    emailCompany: yup.string().email("email không hợp lệ").required("Vui lòng nhập email"),
    position: yup.string().required("Vui lòng nhập chức vụ"),
    phoneCompany: yup.string().required("Vui lòng nhập số điện thoại"),
    companyCode: yup.string().required("Vui lòng nhập mã công ty"),
});

const initialValues = {
    nameCompany: "",
    addressCompany: "",
    emailCompany: "",
    position: "",
    phoneCompany: "",
    companyCode: "",
};

const getTime = {
    timeStart:null,
    timeEnd:null,
}

function DKTT() {
    const token = localStorage.getItem('token');
    const [user, setUser] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(null);
    const context = useContext(ThemeContext)
    React.useEffect(() => {
        const getInterTime = async () => {
            try{
                const responseGV = await studentApi.getInternshipTime(token);
                console.log(responseGV);
            }catch(err){
                console.log('Error fetching data', err);
            }
        };
        getInterTime().then(data => {
            getTime.timeStart = data.timeStart;
            getTime.timeEnd = data.timeEnd;
        });
        const getTTDASV = async () => {
            context.updateLoading(true);
            try{
                const responseGV = await userApi.getInfo(token);
                setUser(responseGV);
                context.updateLoading(false);
                console.log(responseGV);
            }catch(error){
                context.updateLoading(false);
                setShowAlert({ type: 'error', text: 'Có lỗi xảy ra' + error });
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
            }
        };
        getTTDASV();
    },[]);

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    }

    const handleSubmit = async (values) => {
        console.log(values);
        const dateNow = new Date();
        if(dateNow < getTime.timeStart || dateNow > getTime.timeEnd){
            setShowAlert({ type: 'error', text: "Hết hạn thời gian đăng ký" });
            setTimeout(() => {
                setShowAlert(null);
            }, 2000)
        }else{
            context.updateLoading(true);
            try {
                const response = await studentApi.internshipRegisterBySv({
                    "studentCode":null,
                    "studentId" :null,
                    "code": null,
                    "nameCompany": values.nameCompany,
                    "address": values.addressCompany,
                    "email": values.emailCompany,
                    "internshipPosition": values.position,
                    "phoneNumber": values.phoneCompany,
                    "taxCode": values.companyCode,
                    "description": null,
                },token);
                context.updateLoading(false);
                setShowAlert({ type: 'success', text: "Thêm sinh viên thành công" });
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
                console.log(response);
            } catch (error) {
                context.updateLoading(false);
                setShowAlert({ type: 'error', text: "Thêm sinh viên không thành công " + error});
                setTimeout(() => {
                    setShowAlert(null);
                }, 2000)
            }
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    })

    return (
        <>
        <AlertMessage message={showAlert} />
        <Formik>
            <Box sx={{ display: 'flex' }}>
                <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 720, marginTop: 30, marginLeft: 8, marginRight: 8  }}>
                    <div style={{ borderBottom: '2px ', width: '100%', height: '65%', boxSizing: 'border-box' }}>
                        <div style={{ height: '12%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: "lightgrey" }}>
                            <h1 style={{fontWeight:700, fontSize:25,}}><b>Đăng ký thực tập:</b></h1>
                        </div>
                        <div style={{ height: '88%', borderBottom: '2px', marginTop: 10, textAlign: 'left', marginLeft: 20, }}>
                            <div style={{ float: 'left', width: '20%', height: '100%' }}>
                                <Avatar src={user?.urlImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} sx={{ width: 161, height: 161, marginBottom: 5 }}></Avatar>
                                <h4 style={{ marginBottom: 10 }}>Giới tính:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', }} value={user?.gender  || ""}/>
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%',}}>
                                <h4 style={{ marginBottom: 10 }}>Họ và tên:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} value={user?.fullName  || ""}/>
                                <h4 style={{ marginBottom: 10 }}>Ngày sinh:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} value={transferDate(user?.dateOfBirth)  || ""}/>
                                <div style={{width: "100%"}}>
                                    <div style={{float: 'left',}}>
                                        <h4 style={{ marginBottom: 10 }}>Số điện thoại:</h4>
                                        <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{width: '100%', marginBottom: 5}} value={user?.phoneNumber  || ""}/>
                                    </div>
                                    <div style={{position: 'relative',right: '-25%'}}>
                                        <h4 style={{ marginBottom: 10 }}>Khoa:</h4>
                                        <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{width: '20%', marginBottom: 5}} value={user?.grade?.name || ""}/>
                                    </div>
                                </div>
                            </div>
                            <div style={{ float: 'left', width: '40%', height: '100%' }}>
                                <h4 style={{ marginBottom: 10 }}>Nơi sinh:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} value={user?.placeOfBirth  || ""}/>
                                <h4 style={{ marginBottom: 10 }}>Email:</h4>
                                <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} value={user?.email  || ""}/>
                                <div style={{width: "100%"}}>
                                    <div style={{float: 'left'}}>
                                        <h4 style={{ marginBottom: 10 }}>Mã sinh viên:</h4>
                                        <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{width: '100%', marginBottom: 5}} value={user?.studentCode  || ""}/>
                                    </div>
                                    <div style={{position: 'relative',right: '-25%'}}>
                                        <h4 style={{ marginBottom: 10 }}>Lớp:</h4>
                                        <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{width: '20%', marginBottom: 5}} value={user?.grade?.name || ""}/>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px groove', width: '100%', height: '35%', boxSizing: 'border-box' }}>
                        <div style={{ display: 'block', height: '100%' }}>
                            <div style={{ width: "100%", height: '100%', textAlign: 'left', marginLeft: 20, marginRight: 10 }}>
                                    <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                        <h4 style={{ marginBottom: 10 }}>Tên công ty:</h4>
                                        <TextField 
                                            id="outlined-basic" 
                                            variant="outlined" 
                                            size="small" 
                                            sx={{ width: '80%', marginBottom: 5 }} 
                                            name="nameCompany" 
                                            value={formik.values.nameCompany} 
                                            onChange={formik.handleChange} 
                                            onBlur={formik.handleBlur} 
                                            error={formik.touched.nameCompany && Boolean(formik.errors.nameCompany)} 
                                            helperText={formik.touched.nameCompany && formik.errors.nameCompany}/>
                                        <h4 style={{ marginBottom: 10 }}>Địa chỉ công ty:</h4>
                                        <TextField 
                                            id="outlined-basic" 
                                            variant="outlined" 
                                            size="small" 
                                            sx={{ width: '80%', marginBottom: 5 }} 
                                            name="addressCompany" 
                                            value={formik.values.addressCompany} 
                                            onChange={formik.handleChange} 
                                            onBlur={formik.handleBlur} 
                                            error={formik.touched.addressCompany && Boolean(formik.errors.addressCompany)} 
                                            helperText={formik.touched.addressCompany && formik.errors.addressCompany}/>
                                    </div>
                                    <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                        <h4 style={{ marginBottom: 10 }}>Email công ty:</h4>
                                        <TextField 
                                            id="outlined-basic" 
                                            variant="outlined" 
                                            size="small" 
                                            sx={{ width: '80%', marginBottom: 5 }} 
                                            name="emailCompany" 
                                            value={formik.values.emailCompany} 
                                            onChange={formik.handleChange} 
                                            onBlur={formik.handleBlur} 
                                            error={formik.touched.emailCompany && Boolean(formik.errors.emailCompany)} 
                                            helperText={formik.touched.emailCompany && formik.errors.emailCompany}/>
                                        <h4 style={{ marginBottom: 10 }}>Vị trí thực tập:</h4>
                                        <TextField 
                                            id="outlined-basic" 
                                            variant="outlined" 
                                            size="small" 
                                            sx={{ width: '80%', marginBottom: 5 }} 
                                            name="position" 
                                            value={formik.values.position} 
                                            onChange={formik.handleChange} 
                                            onBlur={formik.handleBlur} 
                                            error={formik.touched.position && Boolean(formik.errors.position)} 
                                            helperText={formik.touched.position && formik.errors.position}/>
                                    </div>
                                    <div style={{ float: 'left', width: '33%', height: '100%' }}>
                                        <h4 style={{ marginBottom: 10 }}>SĐT công ty:</h4>
                                        <TextField 
                                            id="outlined-basic" 
                                            variant="outlined" 
                                            size="small" 
                                            sx={{ width: '80%', marginBottom: 5 }} 
                                            name="phoneCompany" 
                                            value={formik.values.phoneCompany} 
                                            onChange={formik.handleChange} 
                                            onBlur={formik.handleBlur} 
                                            error={formik.touched.phoneCompany && Boolean(formik.errors.phoneCompany)} 
                                            helperText={formik.touched.phoneCompany && formik.errors.phoneCompany}/>
                                        <h4 style={{ marginBottom: 10 }}>Mã công ty:</h4>
                                        <TextField 
                                            id="outlined-basic" 
                                            variant="outlined" 
                                            size="small" 
                                            sx={{ width: '80%', marginBottom: 5 }} 
                                            name="companyCode"
                                            value={formik.values.companyCode} 
                                            onChange={formik.handleChange} 
                                            onBlur={formik.handleBlur} 
                                            error={formik.touched.companyCode && Boolean(formik.errors.companyCode)} 
                                            helperText={formik.touched.companyCode && formik.errors.companyCode}/>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "right", }}>
                        <Button variant="contained" style={{backgroundColor:'#23434E'}} type="submit" onClick={formik.handleSubmit}>Đăng ký</Button>
                    </div>
                </div>
            </Box>
            </Formik>
        </>
    );
}

export default DKTT;