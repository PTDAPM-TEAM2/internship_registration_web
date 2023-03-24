import { useState, createContext, useEffect } from "react";
import Loading from '../Loading/Loading'

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

  function cellValidateCompany(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.company.nameCompany;
    }
  }
  function cellValidateSemesterIntern(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.semester.code;
    }
  }
  function cellValidateStart(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.start;
    }
  }
  function cellValidateEnd(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.end;
    }
  }

  function cellValidateLecturer(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.fullName;
    }
  }

  function cellValidateStudent(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.fullName;
    }
  }

  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(true); 
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState("trang-chu");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4500)
  })
  const updateAuth = (newValue) => {
    setAuth(newValue);
  }
  const updateToggle = (newValue) => {
    setToggle(newValue);
  };
  const updateButton = (newValue) => {
    setActiveButton(newValue);
  };
  const updateLoading = (newValue) => {
    setLoading(newValue);
  }
  const value = {
    cellValidateStart,
    cellValidateEnd,
    cellValidateLecturer,
    cellValidateStudent,
    auth,
    updateAuth,
    cellValidateName,
    cellValidate,
    activeButton,
    updateButton,
    toggle,
    updateToggle,
    updateLoading,
    cellValidateCompany,
    cellValidateSemesterIntern
  };
  return (

    <ThemeContext.Provider value={value}>
      {loading && <Loading />}
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
