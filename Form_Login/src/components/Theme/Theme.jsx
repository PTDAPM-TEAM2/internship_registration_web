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

  function cellValidateCompanyID(e) {
    if (e === null) {
      return null;
    }
    else {
      return e.company.id;
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
      return e.lecturer.fullName;
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

  function cellValidatePhone(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.phoneNumber;
    }
  }
  function cellValidateSemester(e) {
    if (e === null) {
      return '';
    }
    else {
      return e.semester.code;
    }
  }
  function cellValidateImage(e) {
    if (e === null) {
      return null;
    }
    else {
      return e.urlImg;
    }
  }

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [activeButton, setActiveButton] = useState("trang-chu");

  // const checkToken = (newValue) => {
  //   const token = localStorage.getItem("token");
  //   // if (token === null) {
  //   //   localStorage.setItem("token", newValue);
  //   //   setAuth(true);
  //   //   console.log('dang nhap');
  //   // }
  //   // if (token === newValue) {
  //   //   setAuth(true);
  //   //   console.log('dang nhap1');
  //   // }

  //   if (token) {
  //     setAuth(true);
      
  //   }
  // }

  // useEffect((newValue) => {
  //   checkToken(newValue);
  // }, [])

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
    cellValidateCompanyID,
    cellValidateImage,
    cellValidateSemester,
    cellValidatePhone,
    cellValidateStart,
    cellValidateEnd,
    cellValidateLecturer,
    cellValidateStudent,
    auth,
    // checkToken,
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
