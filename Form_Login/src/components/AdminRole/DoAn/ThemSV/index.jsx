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
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import studentApi from "../../../../api/studentApi";
import { useContext } from 'react';
import { ThemeContext } from '../../../Theme/Theme.jsx';


const currencies = [
    {
        value: '62PM2',
    },
    {
        value: '62PM1',
    },
    {
        value: '61TH1',
    },
    {
        value: '60HT',
    },
];

const grade = {
    name: '',
    students: null,
}


const initialValues = {
    urlImg: '',
    fullName: '',
    gender: '',
    idNumber: '',
    dateOfBirth: new Date(),
    placeOfBirth: '',
    phoneNumber: '',
    email: '',
    studentCode: '',
    grade,
    semester: '',
    password: '',

};
const validationSchema = Yup.object({
    fullName: Yup.string().required(),
    email: Yup.string().email().required(),
    gender: Yup.string().required(),
    idNumber: Yup.string().matches(/^[0-9]{12}$/).required(),
    dateOfBirth: Yup.date().max(new Date()).required(),
    placeOfBirth: Yup.string().required(),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/).required(),
    studentCode: Yup.string().required(),
    grade: Yup.string().required(),
    semester: Yup.string().required(),
    password: Yup.string().required(),
});

const ThemSV = () => {
    const [showAlert, setShowAlert] = React.useState(false);
    const navigate = useNavigate();
    const [imageFile, setImageFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const context = useContext(ThemeContext);

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
    };

    // const [submitting, setSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // values = JSON.stringify(values);
                console.log(JSON.stringify(values));
                const response = await studentApi.addSVDA(JSON.stringify(values) , context.token);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
            // setTimeout(() => {
            //     navigate('/quan-ly-sinh-vien-da/danh-sach-sinh-vien-da')
            // }, 2000)
        },
    })
    
    const [value, setValue] = React.useState('');
    const handleMenu = (e, newValue) => {
        setValue(newValue);
    }
    console.log(value);

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
                                            <label htmlFor="urlImg" className={styles.upload} >
                                                <FileUploadIcon />
                                                <span>Tải lên</span>
                                            </label>
                                            <input
                                                className={styles.fileInput}
                                                name='urlImg'
                                                id='urlImg'
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={handleImageFileChange}
                                                value={formik.values.urlImg}
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
                                    <label htmlFor='fullName'>Họ tên: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id='fullName'
                                        name='fullName'
                                        onChange={formik.handleChange}
                                        value={formik.values.fullName}
                                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    />
                                </div>
                                <div className={styles.txt} >
                                    <label htmlFor='idNumber'>Số căn cước: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="idNumber"
                                        name="idNumber"
                                        onChange={formik.handleChange}
                                        value={formik.values.identityCard}
                                        error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='dateOfBirth'>Ngày sinh: </label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DatePicker
                                            renderInput={(props) => <TextField {...props} className={styles.txtDate} />}
                                            value={formik.values.dateOfBirth}
                                            onChange={(value) => formik.handleChange({ target: { name: 'dateOfBirth', value } })}
                                            // onChange={formik.handleChange}
                                            // name='dateOfBirth'
                                            format="YYYY/MM/DD"
                                            maxDate={new Date()}
                                            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='placeOfBirth'>Nơi sinh: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="placeOfBirth"
                                        name="placeOfBirth"
                                        onChange={formik.handleChange}
                                        value={formik.values.placeOfBirth}
                                        error={formik.touched.placeOfBirth && Boolean(formik.errors.placeOfBirth)}

                                    />
                                </div>
                                <div className={styles.txt}>
                                    <label htmlFor='phoneNumber'>Số điện thoại: </label>
                                    <TextField
                                        className={styles.txtField}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        onChange={formik.handleChange}
                                        value={formik.values.phoneNumberNumber}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
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
                                    id="studentCode"
                                    name="studentCode"
                                    value={formik.values.studentCode}
                                    onChange={formik.handleChange}
                                    error={formik.touched.studentCode && Boolean(formik.errors.studentCode)}
                                />
                            </div>
                            <div className={styles.txt}>
                                <p>Lớp: </p>
                                <Menu
                                    className={styles.txtFieldBot}
                                    id="grade"
                                    // name="grade"
                                    select
                                    value={value}
            
                                    // onChange={(value) => {
                                    //     formik.handleChange(grade.name, value)
                                    //     console.log(grade.name);
                                    // }}
                                    // error={formik.touched.grade && Boolean(formik.errors.grade)}
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}
                                            onClick = {(e) => {handleMenu(e, option.value)}}
                                        >
                                            {option.value}

                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <div className={styles.txt}>
                                <p>Kỳ: </p>
                                <TextField
                                    className={styles.txtFieldBot}
                                    id="semester"
                                    name="semester"
                                    value={formik.values.semester}
                                    onChange={formik.handleChange}
                                    error={formik.touched.semester && Boolean(formik.errors.semester)}
                                />
                            </div>
                            <div className={styles.txt}>
                                <p>Mật khẩu: </p>
                                <TextField className={styles.txtFieldBot}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    type='password'
                                    // disabled
                                />
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button} type="submit" onClick={() => {console.log(formik.values)}}>Thêm</button>
                        </div>
                    </form>
                </div>

            </div>
            {
                // formik.errors !== null ?
                //     (showAlert &&
                //         < div >
                //             < Alert severity="error" sx={{
                //                 position: 'fixed',
                //                 width: '40%',
                //                 bottom: '0',
                //                 right: '2%'
                //             }}>
                //                 <AlertTitle>Nhập thiếu thông tin vui lòng nhập lại !</AlertTitle>
                //             </Alert>
                //         </div>)
                //     : (showAlert &&
                //         < div >
                //             < Alert severity="success" sx={{
                //                 position: 'fixed',
                //                 width: '40%',
                //                 bottom: '0',
                //                 right: '2%'
                //             }}>
                //                 <AlertTitle>Thêm thông tin sinh viên thành công !</AlertTitle>
                //             </Alert>
                //         </div>)
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
            {/* {showAlert && formik.errors === {} &&
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


            } */}
        </div >
    );
};

export default ThemSV;
