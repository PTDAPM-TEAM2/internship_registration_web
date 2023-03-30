// import React, { useContext } from "react";
// import { Avatar, Button, TextField } from "@mui/material";
// import { Box } from "@mui/system";
// import userApi from "../../../../../api/authApi";
// import * as yup from "yup";
// import { Form, Formik, useFormik } from "formik";
// import studentApi from "../../../../../api/studentApi";
// import { ThemeContext } from "../../../../Theme/Theme";
// import AlertMessage from "./Alert";
// import styles from './DangKyTT.module.css';

// const styleTextField = {
//     width: '80%', marginBottom: 5
// };

// const validationSchema = yup.object().shape({
//     nameCompany: yup.string().required("Vui lòng nhập tên công ty"),
//     addressCompany: yup.string().required("Vui lòng nhập địa chỉ"),
//     emailCompany: yup.string().email("email không hợp lệ").required("Vui lòng nhập email"),
//     position: yup.string().required("Vui lòng nhập chức vụ"),
//     phoneCompany: yup.string().required("Vui lòng nhập số điện thoại"),
//     companyCode: yup.string().required("Vui lòng nhập mã công ty"),
// });

// const initialValues = {
//     nameCompany: "",
//     addressCompany: "",
//     emailCompany: "",
//     position: "",
//     phoneCompany: "",
//     companyCode: "",
// };

// const getTime = {
//     timeStart: new Date(),
//     timeEnd: new Date(),
// }

// function DKTT() {
//     const token = localStorage.getItem('token');
//     const [user, setUser] = React.useState([]);
//     const [showAlert, setShowAlert] = React.useState(null);
//     const context = useContext(ThemeContext)
//     const [start, setStart] = React.useState('');
//     const [end, setEnd] = React.useState('');
//     const [companies, setCompanies] = React.useState([]);

//     React.useEffect(() => {
//         const getInterTime = async () => {
//             try {
//                 const response = await studentApi.getInternshipTime();
//                 setStart(new Date(response.timeStart))
//                 setEnd(new Date(response.timeEnd))
//             } catch (err) {
//                 console.log('Error fetching data', err);
//             }
//         };
//         getInterTime();
//         const getTTDASV = async () => {
//             context.updateLoading(true);
//             try {
//                 const response = await userApi.getInfo(token);
//                 setUser(response);
//                 context.updateLoading(false);
//                 console.log(response);
//             } catch (error) {
//                 context.updateLoading(false);
//                 setShowAlert({ type: 'error', text: 'Có lỗi xảy ra' + error });
//                 setTimeout(() => {
//                     setShowAlert(null);
//                 }, 2000)
//             }
//         };
//         getTTDASV();


//         // const getCompany = async () => {
//         //     context.updateLoading(true);
//         //     try {
//         //         const response = await companyApi.getCompanies(token);
//         //         setCompanies(response);
//         //         context.updateLoading(false);
//         //     } catch (error) {
//         //         console.error('Error fetching data:', error);
//         //         context.updateLoading(false);

//         //     }
//         // }
//         // getCompany()
//     }, []);


//     const handleSubmit = async (values) => {

//         const dateNow = new Date();
//         if (dateNow > end) {
//             alert("Thời gian đăng ký đã kết thúc");
//         } else {
//             context.updateLoading(true);
//             try {
//                 const response = await studentApi.internshipRegisterBySv({
//                     "studentCode": null,
//                     "studentId": null,
//                     "code": null,
//                     "nameCompany": values.nameCompany,
//                     "address": values.addressCompany,
//                     "email": values.emailCompany,
//                     "internshipPosition": values.position,
//                     "phoneNumber": values.phoneCompany,
//                     "taxCode": values.companyCode,
//                     "description": null,
//                 }, token);
//                 context.updateLoading(false);
//                 setShowAlert({ type: 'success', text: "Thêm sinh viên thành công" });
//                 setTimeout(() => {
//                     setShowAlert(null);
//                 }, 2000)
//                 console.log(response);
//             } catch (error) {
//                 context.updateLoading(false);
//                 setShowAlert({ type: 'error', text: "Thêm sinh viên không thành công " + error });
//                 setTimeout(() => {
//                     setShowAlert(null);
//                 }, 2000)
//             }
//         }
//     }
//     const formik = useFormik({
//         initialValues,
//         validationSchema,
//         onSubmit: handleSubmit,
//     })
// return (
//         <>
//             <AlertMessage message={showAlert} />
//             <Formik>
//                 <Box sx={{ display: 'flex' }}>
//                     <div style={{ display: "block", borderStyle: "solid", borderWidth: '2px', top: '10%', width: '100%', height: 720, marginTop: 30, marginLeft: 8, marginRight: 8 }}>
//                         <div style={{ borderBottom: '2px ', width: '100%', height: '65%', boxSizing: 'border-box' }}>
//                             <div style={{ height: '12%', borderBottom: '2px solid', textAlign: 'center', backgroundColor: "lightgrey" }}>
//                                 <h1 style={{ fontWeight: 700, fontSize: 25, }}><b>Đăng ký thực tập:</b></h1>
//                             </div>
//                             <div style={{ height: '88%', borderBottom: '2px', marginTop: 10, textAlign: 'left', marginLeft: 20, }}>
//                                 <div style={{ float: 'left', width: '20%', height: '100%' }}>
//                                     <Avatar src={user?.urlImg || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} sx={{ width: 161, height: 161, marginBottom: 5 }}></Avatar>
//                                     <h4 style={{ marginBottom: 10 }}>Giới tính:</h4>
//                                     <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{ width: '80%', }} value={user?.gender || ""} />
//                                 </div>
//                                 <div style={{ float: 'left', width: '40%', height: '100%', }}>
//                                     <h4 style={{ marginBottom: 10 }}>Họ và tên:</h4>
//                                     <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} value={user?.fullName || ""} />
//                                     <h4 style={{ marginBottom: 10 }}>Ngày sinh:</h4>
//                                     <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} />
//                                     <div style={{ width: "100%" }}>
//                                         <div style={{ float: 'left', }}>
//                                             <h4 style={{ marginBottom: 10 }}>Số điện thoại:</h4>
//                                             <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{ width: '100%', marginBottom: 5 }} value={user?.phoneNumber || ""} />
//                                         </div>
//                                         <div style={{ position: 'relative', right: '-25%' }}>
//                                             <h4 style={{ marginBottom: 10 }}>Khoa:</h4>
//                                             <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{ width: '20%', marginBottom: 5 }} value={user?.grade?.name || ""} />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div style={{ float: 'left', width: '40%', height: '100%' }}>
//                                     <h4 style={{ marginBottom: 10 }}>Nơi sinh:</h4>
//                                     <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} value={user?.placeOfBirth || ""} />
//                                     <h4 style={{ marginBottom: 10 }}>Email:</h4>
//                                     <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={styleTextField} value={user?.email || ""} />
//                                     <div style={{ width: "100%" }}>
//                                         <div style={{ float: 'left' }}>
//                                             <h4 style={{ marginBottom: 10 }}>Mã sinh viên:</h4>
//                                             <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{ width: '100%', marginBottom: 5 }} value={user?.studentCode || ""} />
//                                         </div>
//                                         <div style={{ position: 'relative', right: '-25%' }}>
//                                             <h4 style={{ marginBottom: 10 }}>Lớp:</h4>
//                                             <TextField disabled id="outlined-basic" variant="outlined" size="small" sx={{ width: '20%', marginBottom: 5 }} value={user?.grade?.name || ""} />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ borderTop: '2px groove', width: '100%', height: '35%', boxSizing: 'border-box' }}>
//                             <div style={{ display: 'block', height: '100%' }}>
//                                 <div style={{ width: "100%", height: '100%', textAlign: 'left', marginLeft: 20, marginRight: 10 }}>
//                                     <div style={{ float: 'left', width: '33%', height: '100%' }}>
//                                         <h4 style={{ marginBottom: 10 }}>Tên công ty:</h4>
//                                         <TextField
//                                             id="outlined-basic"
//                                             variant="outlined"
//                                             size="small"
//                                             sx={{ width: '80%', marginBottom: 5 }}
//                                             name="nameCompany"
//                                             value={formik.values.nameCompany}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.nameCompany && Boolean(formik.errors.nameCompany)}
//                                             helperText={formik.touched.nameCompany && formik.errors.nameCompany} />
//                                         <h4 style={{ marginBottom: 10 }}>Địa chỉ công ty:</h4>
//                                         <TextField
//                                             id="outlined-basic"
//                                             variant="outlined"
//                                             size="small"
//                                             sx={{ width: '80%', marginBottom: 5 }}
//                                             name="addressCompany"
//                                             value={formik.values.addressCompany}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.addressCompany && Boolean(formik.errors.addressCompany)}
//                                             helperText={formik.touched.addressCompany && formik.errors.addressCompany} />
//                                     </div>
//                                     <div style={{ float: 'left', width: '33%', height: '100%' }}>
//                                         <h4 style={{ marginBottom: 10 }}>Email công ty:</h4>
//                                         <TextField
//                                             id="outlined-basic"
//                                             variant="outlined"
//                                             size="small"
//                                             sx={{ width: '80%', marginBottom: 5 }}
//                                             name="emailCompany"
//                                             value={formik.values.emailCompany}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.emailCompany && Boolean(formik.errors.emailCompany)}
//                                             helperText={formik.touched.emailCompany && formik.errors.emailCompany} />
//                                         <h4 style={{ marginBottom: 10 }}>Vị trí thực tập:</h4>
//                                         <TextField
//                                             id="outlined-basic"
//                                             variant="outlined"
//                                             size="small"
//                                             sx={{ width: '80%', marginBottom: 5 }}
//                                             name="position"
//                                             value={formik.values.position}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.position && Boolean(formik.errors.position)}
//                                             helperText={formik.touched.position && formik.errors.position} />
//                                     </div>
//                                     <div style={{ float: 'left', width: '33%', height: '100%' }}>
//                                         <h4 style={{ marginBottom: 10 }}>SĐT công ty:</h4>
//                                         <TextField
//                                             id="outlined-basic"
//                                             variant="outlined"
//                                             size="small"
//                                             sx={{ width: '80%', marginBottom: 5 }}
//                                             name="phoneCompany"
//                                             value={formik.values.phoneCompany}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.phoneCompany && Boolean(formik.errors.phoneCompany)}
//                                             helperText={formik.touched.phoneCompany && formik.errors.phoneCompany} />
//                                         <h4 style={{ marginBottom: 10 }}>Mã công ty:</h4>
//                                         <TextField
//                                             id="outlined-basic"
//                                             variant="outlined"
//                                             size="small"
//                                             sx={{ width: '80%', marginBottom: 5 }}
//                                             name="companyCode"
//                                             value={formik.values.companyCode}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.companyCode && Boolean(formik.errors.companyCode)}
//                                             helperText={formik.touched.companyCode && formik.errors.companyCode} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ textAlign: "right", }}>
//                             <Button variant="contained" style={{ backgroundColor: '#23434E' }} type="submit" onClick={handleSubmit}>Đăng ký</Button>
//                         </div>
//                     </div>
//                 </Box>
//             </Formik>
//         </>
//     );

// }

// export default DKTT;
import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './DangKyTT.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import studentApi from "../../../../../api/studentApi";
import companyApi from "../../../../../api/companyApi";
import { useContext } from 'react';
import { ThemeContext } from '../../../../Theme/Theme';
import AlertMessage from '../../../../AdminRole/DoAn/ThemSV/Alert';
import userApi from '../../../../../api/authApi';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import warningImage from '../../../../../images/warning.png';

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
const validationSchema = Yup.object({
    internshipPosition: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
    nameCompany: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
    taxCode: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
    email: Yup.string().trim().email('Nhập sai định dạng thông tin!').required('Vui lòng nhập đủ thông tin!'),
    phoneNumber: Yup.string().trim().matches(/^[0-9]{10}$/, 'Nhập sai định dạng thông tin!').required('Vui lòng nhập đủ thông tin!'),
    address: Yup.string().trim().required('Vui lòng nhập đủ thông tin!'),
});

const DKTT = () => {
    // const [message, setMessage] = React.useState('');
    // const [errorMessages, setErrorMessages] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(null);
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const token = localStorage.getItem('token');
    const [start, setStart] = React.useState('');
    const [end, setEnd] = React.useState('');
    const [user, setUser] = React.useState([]);
    const getToday = new Date();
    const [errorMessages, setErrorMessages] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const initVl = {
        nameCompany: '',
        taxCode: '',
        email: '',
        phoneNumber: '',
        address: '',
        internshipPosition: '',
    };

    React.useEffect(() => {
        const getInterTime = async () => {
            try {
                const response = await studentApi.getInternshipTime();
                // s
            } catch (err) {
                console.log('Error fetching data', err);
            }
        };
        getInterTime();
    }, []);

    React.useEffect(() => {
        const getTTDASV = async () => {
            context.updateLoading(true);
            try {
                const response = await userApi.getInfo(token);
                setUser(response);
                context.updateLoading(false);
            } catch (error) {
                context.updateLoading(false);
                console.log(error);
            }
        };
        getTTDASV();
    }, [])

    const formik = useFormik({
        initialValues: initVl,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            context.updateLoading(true);
            if (getToday < start) {
                setErrorMessages("Chưa đến thời gian đăng ký thực tập!");
            }
            else if (getToday > end) {
                setErrorMessages("Đã hết thời gian đăng ký thực tập!");
            }
            else {
                try {
                    const response = await studentApi.internshipRegisterBySv(values, token);
                    context.updateLoading(false);
                    setErrorMessages('');
                    setShowAlert({ type: 'success', text: "Đăng ký thành công!" });
                    setTimeout(() => {
                        setShowAlert(null);
                    }, 2000)
                    console.log(response);
                } catch (error) {
                    context.updateLoading(false);
                    if (error.response.data.error) {
                        setShowAlert({ type: 'error', text: error.response.data.error });
                        setTimeout(() => {
                            setShowAlert(null);
                        }, 2000)
                    }
                }
            }
        },
    })

    const transferDate = (date) => {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();
        return day + "/" + month + "/" + year + " " + hour + ":" + minute;
    }

    return (
        <div style={{ display: 'flex' }}>
            <div className={styles.form}>
                <AlertMessage message={showAlert} />
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Đăng ký thực tập</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} >
                            <label htmlFor="">Thời gian thực tập:</label>
                            <div style={{ textAlign: 'start' }}>
                                <label htmlFor="">Thời gian đăng kí:</label>
                                <div>
                                    <p htmlFor="start">Ngày bắt đầu: {transferDate(start)}</p>
                                </div>
                                <div>
                                    <label htmlFor="">Ngày kết thúc: {transferDate(end)}</label>
                                </div>
                            </div>

                        </div>
                        <div className={styles.inputValues}>
                            <div className={styles.infoAccount}>
                                <div className={styles.txt}>
                                    <label htmlFor='taxCode'>Mã công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="taxCode"
                                        name="taxCode"
                                        value={formik.values.taxCode}
                                        onChange={formik.handleChange}
                                        error={formik.touched.taxCode && Boolean(formik.errors.taxCode)}
                                        helperText={formik.touched.taxCode && formik.errors.taxCode}

                                    />
                                </div>


                                <div className={styles.txt}>
                                    <label htmlFor='nameCompany'>Tên công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="nameCompany"
                                        name="nameCompany"
                                        value={formik.values.nameCompany}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nameCompany && Boolean(formik.errors.nameCompany)}
                                        helperText={formik.touched.nameCompany && formik.errors.nameCompany}

                                    />
                                </div>



                                <div className={styles.txt}>
                                    <label htmlFor='phoneNumber'>SĐT công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}

                                    />
                                </div>



                                <div className={styles.txt}>
                                    <label htmlFor='email'>Email công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}

                                    />
                                </div>



                                <div className={styles.txt}>
                                    <label htmlFor='address'>Địa chỉ công ty: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="address"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}

                                    />
                                </div>

                                <div className={styles.txt}>
                                    <label htmlFor='internshipPosition'>Ví trí thực tập: </label>
                                    <TextField
                                        className={styles.txtFieldBot}
                                        id="internshipPosition"
                                        name="internshipPosition"
                                        value={formik.values.internshipPosition}
                                        onChange={formik.handleChange}
                                        error={formik.touched.internshipPosition && Boolean(formik.errors.internshipPosition)}
                                        helperText={formik.touched.internshipPosition && formik.errors.internshipPosition}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type="submit">Thêm</button>
                        </div>
                    </form>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h3" style={{ color: 'red', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={warningImage} alt="" style={{ width: '25px', height: '25px', objectFit: 'cover', marginRight: '20px' }} />{errorMessages}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 40 }}>
                            <Button onClick={handleClose} className={styles.button}>OK</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div >
    )

}

export default DKTT;