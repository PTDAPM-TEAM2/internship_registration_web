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
    const url = "/api/user/get-current-user";
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

    const url = "/api/internship/register-internship";
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

    const url = "/api/internship/register-internship";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
    // return res, méo biết trả về j, file danh sách api ko thấy nói nên cứ check cả data với status code
  };
}

const studentApi = new StudentApi();
export default studentApi;
