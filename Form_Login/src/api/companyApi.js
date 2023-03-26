import axiosClient from "./axiosClient";
class CompanyApi {
  // lay tat ca cong ty
  getCompanies = (token) => {
    const url = "api/company/getAll";
    return axiosClient
      .get(url, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

  importExcel = (data, token) => {
    const url = "api/company/import-excel";
    return axiosClient
      .post(url, data,
        {
          headers: {
            Authorization: "Bearer " + token, //the token is a variable which holds the token
            "Content-Type":
              "multipart/form-data; boundary=<calculated when request is sent>",
          },
        }
      )
      .then((res) => res);
  };

  addSV = (body) => {
    const url = "api/internship/register-many-st";
    const token = localStorage.getItem("token");
    return axiosClient
      .post(url, body, {
        headers:
        {
          Authorization: "Bearer " + token,
        },
      }
      )
  }

}

const companyApi = new CompanyApi();
export default companyApi;
