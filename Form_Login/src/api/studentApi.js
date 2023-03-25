import axiosClient from "./axiosClient";
class StudentApi {
  // lay tat ca sinh vien lam do an
  getAllSvDa = (params, token) => {
    // param co the de trong, neu can tim hoac loc sinh se truyen param
    const url = "api/student/get-st-da-by-search";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token,
          //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

  // lay tat ca sinh vien thuc tap
  getAllSvTt = (params, token) => {
    const url = "api/student/get-st-tt-by-search";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

  // import excel file do an
  importExcelSvDa = (data, token) => {
    // data la file excel
    const url = "api/student/import-excel-da";
    return axiosClient
      .post(
        url,
        data,
        {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
          },
        }
        // params
      )
      .then((res) => res);
    // return res, check res.status == 200 va check res.data co bang true thi la doi mk thanh cong
    // new res.status == 400 (!= 200) thi loi
  };

  importExcelSvTt = (data, token) => {
    // data la file excel
    const url = "api/student/import-excel-tt";
    return axiosClient
      .post(
        url,
        data,
        {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
          },
        }
        // params
      )
      .then((res) => res);
    // return res, check res.status == 200 va check res.data co bang true thi la doi mk thanh cong
    // new res.status == 400 (!= 200) thi loi
  };

  // admin dang ky thuc tap cho sinh vien
  internshipRegisterByAd = (params, token) => {
    // params =  {"studentCode":"SV002","studentId" :null,"code": null,"internshipPosition":"be dev","nameCompany":"facebook","email":"facebook@gmail.com","phoneNumber":"01234567899","address":"Hà Nội","taxCode":null,"description":null}

    const url = "api/internship/register-internship";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
    // return res, méo biết trả về j, file danh sách api ko thấy nói nên cứ check cả data với status code
  };

  // sinh vien tu dang ky thuc tap
  internshipRegisterBySv = (params, token) => {
    // params =  {"studentId" :null,"code": null,"internshipPosition":"be dev","nameCompany":"facebook","email":"facebook@gmail.com","phoneNumber":"01234567899","address":"Hà Nội","taxCode":null,"description":null}

    const url = "api/internship/register-internship";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
    // return res, méo biết trả về j, file danh sách api ko thấy nói nên cứ check cả data với status code
  };

  registerTimeDA = (data, token) => {

    const url = "api/registertime/save-da";
    return axiosClient
      .post(url, data, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

  registerTimeTT = (data, token) => {

    const url = "api/registertime/save-tt";
    return axiosClient
      .post(url, data, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

  getGrade = (token) => {
    const url = "api/grade/getAll";
    return axiosClient
      .get(url, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

  addSVDA = (body, token) => {
    const url = "api/student/save/da";
    return axiosClient
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
  };

  updateSVDA = (body, id) => {
    const url = `api/student/update/da/${id}`;
    const token = localStorage.getItem('token');
    return axiosClient
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          // 'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
    // day la ham update
  };


  deleteSVDA = (id) => {
    const url = `api/student/delete/tt/${id}`;
    const token = localStorage.getItem('token');
    return axiosClient
      .delete(url, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          // 'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
    // day la ham update
  };

  addSVTT = (body, token) => {
    const url = "api/student/save/tt";
    return axiosClient
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
  };

  updateSVTT = (body, id) => {
    const url = `api/student/update/tt/${id}`;
    const token = localStorage.getItem('token');
    return axiosClient
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          // 'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
    // day la ham update
  };

  filter = (type) => {
    const url = `api/student/get-st-by-filter?type=${type}`;
    const token = localStorage.getItem('token');
    return axiosClient
      .get(url, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          // 'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
    // day la ham update
  };

}

const studentApi = new StudentApi();
export default studentApi;
