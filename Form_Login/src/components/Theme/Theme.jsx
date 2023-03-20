import { useState, createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {

  function cellValidate(e) {
    if (e === null) {
      return '';
    }
    else {
      return e;
    }
  }
  function cellValidateName(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.nameGraduationThesis;
    }
  }

  function cellValidateLecture(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.lecturer.fullName;
    }
  }

  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  localStorage.setItem('token', token);
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState("trang-chu");

  const updateAuth = (newValue) => {
    setAuth(newValue);
  }
  const updateToggle = (newValue) => {
    setToggle(newValue);
  };
  const updateButton = (newValue) => {
    setActiveButton(newValue);
  };
  const updateToken = (newValue) => {
    setToken(newValue);
  };
  const value = {
    cellValidateLecture,
    auth,
    updateAuth,
    cellValidateName,
    cellValidate,
    activeButton,
    updateButton,
    toggle,
    updateToggle,
    token,
    updateToken,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
