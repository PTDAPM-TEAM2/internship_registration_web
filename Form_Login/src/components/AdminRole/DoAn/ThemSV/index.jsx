import * as React from 'react';
import { TextField } from '@mui/material';
import styles from './ThemSV.module.css';
import Sidebar from '../../../Sidebar';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Variables from '../../../../utils/variables';

const initialValues = {
    image: '',
    name: '',
    gender: '',
    idCard: '',
    dob: dayjs(),
    pob: '',
    phone: '',
    email: '',
    masv: '',
    lop: '',
    ky: '',
    mk: '',

};
const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    gender: Yup.string().required(),
    idCard: Yup.string().matches(/^[0-9]{12}$/).required(),
    dob: Yup.date().max(new Date()).required(),
    pob: Yup.string().required(),
    phone: Yup.string().matches(/^[0-9]{10}$/).required(),
    masv: Yup.string().required(),
    lop: Yup.string().required(),
    ky: Yup.string().required(),
    mk: Yup.string().required(),

});

function createData(Hoten, Lop, TenDoAn, Ky, SoCC, NgaySinh, NoiSinh, SDT, email, Ma, Mk, GiangVien, Khoa, gt) {
    return { Hoten, Lop, TenDoAn, Ky, SoCC, NgaySinh, NoiSinh, SDT, email, Ma, Mk, GiangVien, Khoa, gt };
}

const ThemSV = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
    };


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            Variables.studentList.push(createData(values.name, values.lop,  '', values.ky, values.idCard, values.dob, values.pob, values.phone, values.email, values.masv, values.mk, '', '', values.gender ));
            console.log(Variables.studentList);
            navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da')
        },
    })
    // console.log(formik.errors);
    // console.log(showAlert);
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles.form}>
                <div style={{ width: '100%' }}>
                    <p className={styles.title}>Thêm Sinh Viên</p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.formAccount} columns={{ lg: 4 }} >
                            <div className={styles.infoImg} >
                                <div className={styles.txt}>
                                    {(imageFile === null) &&
                                        <div>
                                            <label htmlFor="image" className={styles.upload} >
                                                <FileUploadIcon />
                                                <span>Tải lên</span>
                                            </label>
                                            <input
                                                className={styles.fileInput}
                                                name='image'
                                                id='image'
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleImageFileChange}
                                                value={formik.values.image}
                                            />
                                        </div>
                                    }
                                    {
                                        imageFile &&
                                        <div className={styles.image}>
                                            <img src={imageUrl} alt='avatar' style={{ maxWidth: '100%' }} />
                                        </div>
                                    }
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor="gender">Giới tính: </label>
                                    <TextField
                                        id="gender"
                                        name="gender"
                                        onChange={formik.handleChange}
                                        value={formik.values.gender}
                                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputValue}>
                                <div className={styles.txt} >
                                    <label htmlFor='name'>Họ tên: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id='name'
                                        name='name'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                    />
                                </div>
                                <div className={styles.txt} >
                                    <label htmlFor='idCard'>Số căn cước: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="idCard"
                                        name="idCard"
                                        onChange={formik.handleChange}
                                        value={formik.values.identityCard}
                                        error={formik.touched.idCard && Boolean(formik.errors.idCard)}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='dob'>Ngày sinh: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} className={styles.txtDate} />}
                                            value={formik.values.dob}
                                            onChange={(value) => formik.handleChange({ target: { name: 'dob', value } })}
                                            format="YYYY/MM/DD"
                                            // defaultValue={dayjs()}
                                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='pob'>Nơi sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="pob"
                                        name="pob"
                                        onChange={formik.handleChange}
                                        value={formik.values.pob}
                                        error={formik.touched.pob && Boolean(formik.errors.pob)}

                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='phone'>Số điện thoại: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="phone"
                                        name="phone"
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumber}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='email'>Email: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <Grid container columns={12} spacing={2}>
                            <Grid item lg={2} xs={12}>
                                <div className={styles.txt}>
                                    {(imageFile === null) &&
                                        <div>
                                            <label htmlFor="file" className={styles.upload} >
                                                <FileUploadIcon />
                                                <span>Tải lên</span>
                                            </label>
                                            <input className={styles.fileInput} name='file' id='file' type="file" accept=".jpg, .jpeg, .png" onChange={handleImageFileChange} />
                                        </div>
                                    }
                                    {
                                        imageFile &&
                                        <div className={styles.image}>
                                            <img src={imageUrl} alt='avatar' style={{ maxWidth: '100%' }} />
                                        </div>
                                    }
                                </div>
                                <div className={styles.txt}>
                                    <p>Giới tính: </p>
                                    <TextField />
                                </div>
                            </Grid>
                            <Grid item lg={5} xs={12}>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Họ tên: </p>
                                        <TextField className={styles.txtField} fullWidth />
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Ngày sinh: </p>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <DatePicker
                                                renderInput={(props) => <TextField {...props} className={styles.txtDate} />}
                                                value={date}
                                                onChange={(newValue) => {
                                                    setDate(newValue);
                                                }}
                                                format="YYYY/MM/DD"
                                                defaultValue={dayjs()}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Số điện thoại: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                            </Grid>


                            <Grid item lg={5} xs={12}>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Số căn cước: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Nơi sinh: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                                <Grid>
                                    <div className={styles.txt}>
                                        <p>Email: </p>
                                        <TextField className={styles.txtField} />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid> */}

                        <div className={styles.infoAccount}>
                            <div className={styles.txt}>
                                <p>Mã sinh viên: </p>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="masv"
                                    name="masv"
                                    value={formik.values.masv}
                                    onChange={formik.handleChange}
                                    error={formik.touched.masv && Boolean(formik.errors.masv)}
                                />
                            </div>
                            <div className={styles.txt}>
                                <p>Lớp: </p>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="lop"
                                    name="lop"
                                    value={formik.values.lop}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lop && Boolean(formik.errors.lop)}
                                />
                            </div>
                            <div className={styles.txt}>
                                <p>Kỳ: </p>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="ky"
                                    name="ky"
                                    value={formik.values.ky}
                                    onChange={formik.handleChange}
                                    error={formik.touched.ky && Boolean(formik.errors.ky)}
                                />
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField className={styles.txtFieldBot}
                                    id="mk"
                                    name="mk"
                                    value={formik.values.mk}
                                    onChange={formik.handleChange}
                                    error={formik.touched.mk && Boolean(formik.errors.mk)}
                                />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} disabled={formik.isSubmitting} type="submit" onClick={() => {
                                setShowAlert(true)
                            }}>Thêm</button>
                        </div>
                    </form>
                </div>

            </div>
            {
                // formik.errors !== {} ?
                //     (showAlert &&
                //     < div >
                //         < Alert severity="error" sx={{
                //             position: 'fixed',
                //             width: '40%',
                //             bottom: '0',
                //             right: '2%'
                //         }}>
                //             <AlertTitle>Nhập thiếu thông tin vui lòng nhập lại !</AlertTitle>
                //         </Alert>
                //     </div>)
                //     : (showAlert &&
                //     < div >
                //         < Alert severity="success" sx={{
                //             position: 'fixed',
                //             width: '40%',
                //             bottom: '0',
                //             right: '2%'
                //         }}>
                //             <AlertTitle>Thêm thông tin sinh viên thành công !</AlertTitle>
                //         </Alert>
                //     </div>)
                // formik.errors == {} ?
                // showAlert &&
                // < div >
                //     < Alert severity="error" sx={{
                //         position: 'fixed',
                //         width: '40%',
                //         bottom: '0',
                //         right: '2%'
                //     }}>
                //         <AlertTitle>True</AlertTitle>
                //     </Alert>
                // </div>
                // : showAlert &&
                // < div >
                //     < Alert severity="success" sx={{
                //         position: 'fixed',
                //         width: '40%',
                //         bottom: '0',
                //         right: '2%'
                //     }}>
                //         <AlertTitle>false</AlertTitle>
                //     </Alert>
                // </div>

            }
            {showAlert && formik.errors === {} &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        bottom: '0',
                        right: '2%'
                    }}>
                        <AlertTitle>Thêm thông tin sinh viên thành công !</AlertTitle>
                    </Alert>
                </div>


            }
        </div >
    );
};

export default ThemSV;
