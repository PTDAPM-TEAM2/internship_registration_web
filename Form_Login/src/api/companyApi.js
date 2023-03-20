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
}

const companyApi = new CompanyApi();
export default companyApi;