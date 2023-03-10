import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import styles from "./Login.module.css";
import { useContext } from "react";
import { ThemeContext } from "../Theme/Theme.jsx";
import * as Yup from "yup";
import { Formik } from "formik";
import userApi from "../../api/authApi";
import Variables from "../../utils/variables";
import { async } from "q";

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
  };
  const handleClickDA = () => {
    context.updateToggle(true);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setHide(true);
      } else {
        setHide(false);
      }
    };
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setErrorMessage("Nh???p thi???u th??ng tin! Vui l??ng nh???p l???i!");
    } else {
      if (context.toggle === true) {
        try {
          // var tk = await userApi.loginDA({
          //   username: username,
          //   password: password,
          // });
          var tk = "hgasfhgsfdah";
          if (tk !== "") {
            context.token = tk;
            setShowAlert(true);
            setErrorMessage("");
            setUsername("");
            setPassword("");
            setTimeout(() => {
              if (Variables.userRole === "admin") {
                navigate("/quan-ly-do-an-sinh-vien");
              } else if (Variables.userRole === "students") {
              } else if (Variables.userRole === "teachers") {
                navigate("/trang-chu-giang-vien");
              }
            }, 500);
          } else {
            setErrorMessage(
              "T??n ????ng nh???p ho???c m???t kh???u sai! Vui l??ng nh???p l???i!"
            );
          }
        } catch (error) {
          setErrorMessage("L???i k???t n???i");
        }
      } else if (context.toggle === false) {
        try {
          // var tk = userApi.loginTT({ username: username, password: password });
          var tk = 'fasfa';
          if (tk !== "") {
            context.token = tk;
            setShowAlert(true);
            setErrorMessage("");
            setUsername("");
            setPassword("");
            setTimeout(() => {
              if (Variables.userRole === "admin") {
                navigate("/quan-ly-sinh-vien-thuc-tap");
              } else if (Variables.userRole === "students") {
              } else if (Variables.userRole === "teachers") {
                navigate("/trang-chu-giang-vien");
              }
            }, 500);
          } else {
            setErrorMessage(
              "T??n ????ng nh???p ho???c m???t kh???u sai! Vui l??ng nh???p l???i!"
            );
          }
        } catch (error) {
          setErrorMessage("L???i k???t n???i");
        }
      }
    }

    // console.log(context.toggle);
  };

  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  

  return (
    <div className={styles.bg}>
      {showAlert && (
        <div>
          <Alert
            severity="success"
            sx={{
              position: "absolute",
              width: "40%",
              top: "3%",
              right: "1%",
            }}
          >
            <AlertTitle>????ng nh???p th??nh c??ng</AlertTitle>
          </Alert>
        </div>
      )}
      <Grid
        container
        columns={12}
        sx={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <Box
            sx={{
              width: "auto",
              height: 500,
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
            }}
          >
            {hide && width >= 1000 && (
              <div className={styles.image}>
                <img
                  src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/334267397_525694706433267_7682866644021379812_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=nccYAae_r7gAX9xfdqO&_nc_ht=scontent.fhan5-2.fna&oh=00_AfCy2tWCVt7L4a97x90vJLP00_BqnS0DqmKVmGq6P5WDxQ&oe=641264EA"
                  alt=""
                />
              </div>
            )}
            <Stack
              justifyContent="center"
              alignItems="center"
              width={350}
              margin="0 30px"
            >
              <FormControl
                sx={{ m: 1, width: "100%", height: "50px" }}
                variant="standard"
              >
                <Input
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => setUsername(e.target.value)}
                  error={errorMessage !== ""}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  }
                  placeholder={"T??n ????ng nh???p"}
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "100%", height: "50px" }}
                variant="standard"
              >
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
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
                  error={errorMessage !== ""}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  placeholder={"M???t kh???u"}
                />
              </FormControl>
              <div style={{ backgroundColor: "none", height: 20 }}>
                {errorMessage && (
                  <p style={{ color: "red", marginTop: 0 }}>{errorMessage}</p>
                )}
              </div>
              <div className={styles.switch}>
                <span
                  onClick={handleClickTT}
                  className={context.toggle === false ? styles.active : {}}
                >
                  Th???c t???p
                </span>
                <span
                  onClick={handleClickDA}
                  className={context.toggle === true ? styles.active : {}}
                >
                  ????? ??n
                </span>
              </div>
              <button className={styles.btnSubmit}>????ng nh???p</button>
            </Stack>
          </Box>
        </form>
      </Grid>
    </div>
  );
}

export default Login;
