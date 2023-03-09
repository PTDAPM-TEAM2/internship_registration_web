import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import styles from './Login.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../Theme/Theme.jsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import userApi from "../../api/authApi";
import Variables from "../../utils/variables";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [hide, setHide] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const context = useContext(ThemeContext);
    const handleClickTT = () => {
        context.updateToggle(false);

    }
    const handleClickDA = () => {
        context.updateToggle(true);

    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1000) {
                setHide(true);
            }
            else {
                setHide(false);

            }
        }
        setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            setErrorMessage('Nhập thiếu thông tin! Vui lòng nhập lại!')
        }
        // else if (!userApi.login({username: username, password: password})) {
        //     setErrorMessage('Tên đăng nhập hoặc mật khẩu sai! Vui lòng nhập lại!');
        // }
        else {
            if (context.toggle === true) {
                setShowAlert(true);
                setErrorMessage('');
                setUsername('');
                setPassword('');
                setTimeout(() => {
                    if(Variables.userRole === "admin"){
                        navigate('/quan-ly-do-an-sinh-vien');
                    }else if(Variables.userRole === "students"){

                    }else if(Variables.userRole === "teachers"){
                        navigate('/trang-chu-giang-vien');
                    }
                }, 500)
            }
            else if (context.toggle === false) {
                setShowAlert(true);
                setErrorMessage('');
                setUsername('');
                setPassword('');
                setTimeout(() => {
                    if(Variables.userRole === "admin"){
                        navigate('/quan-ly-sinh-vien-thuc-tap');

                    }else if(Variables.userRole === "students"){

                    }else if(Variables.userRole === "teachers"){
                        navigate('/trang-chu-giang-vien');
                    }
                }, 500)
            }
        }

        // console.log(context.toggle);
    }

    const handleClickShowPassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }

    return (
        <div className={styles.bg}>
            {showAlert &&
                <div>
                    <Alert severity="success" sx={{
                        position: 'absolute',
                        width: '40%',
                        top: '3%',
                        right: '1%'
                    }}>
                        <AlertTitle>Đăng nhập thành công</AlertTitle>
                    </Alert>
                </div>}
            <Grid container columns={12} sx={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Box
                        sx={{
                            width: 'auto',
                            height: 500,
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 3,
                            overflow: 'hidden',
                            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;'
                        }}
                    >
                        {hide && (width >= 1000) &&
                            <div className={styles.image}>
                                <img src="https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/334267397_525694706433267_7682866644021379812_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4GtWw4SbqrEAX9tLaiF&_nc_ht=scontent.fhan5-8.fna&oh=00_AfCRG3RZbyxRez9OjS2-CGsf4zNHUUQ_qEpEUTkVwMt_yw&oe=64048D2A" alt="" />
                            </div>
                        }
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            width={350}
                            margin="0 30px"
                        >
                            <FormControl sx={{ m: 1, width: '100%', height: '50px' }} variant="standard">
                                <Input
                                    id="standard-basic"
                                    variant="standard"
                                    onChange={(e) => setUsername(e.target.value)}
                                    error={errorMessage !== ''}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    }
                                    placeholder={"Tên đăng nhập"}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '100%', height: '50px' }} variant="standard">
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            // onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={errorMessage !== ''}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>

                                    }
                                    placeholder={"Mật khẩu"}
                                />
                            </FormControl>
                            <div style={{ backgroundColor: "none", height: 20 }}>
                                {errorMessage && <p style={{ color: 'red', marginTop: 0 }}>{errorMessage}</p>}
                            </div>
                            <div className={styles.switch}>
                                <span onClick={handleClickTT}
                                    className={context.toggle === false ? styles.active : {}} >Thực tập</span>
                                <span onClick={handleClickDA}
                                    className={context.toggle === true ? styles.active : {}} >Đồ án</span>
                            </div>
                            <button className={styles.btnSubmit}>
                                Đăng nhập
                            </button>
                        </Stack>
                    </Box>
                </form >
            </Grid>
        </div>
    )
}

export default Login