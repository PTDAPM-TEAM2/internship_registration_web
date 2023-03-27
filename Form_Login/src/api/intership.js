import axiosClient from "./axiosClient";

class InternshipApi {
  getInternInfo = (id,token) => {
    const url = "/api/internship/get-by-student-login/" + id;
    return axiosClient
      .post(url, {
        headers: {
          Authorization: "Bearer " + token,
          //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

  importExcelMark = (body) => {
    const url = "api/internship/import-mark";
    const token = localStorage.getItem('token');
    return axiosClient
      .post(url, body, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
      })
      .then((res) => res);
  };

}

const internshipApi = new InternshipApi();
export default internshipApi;