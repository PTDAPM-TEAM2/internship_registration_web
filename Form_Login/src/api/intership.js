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

}

const internshipApi = new InternshipApi();
export default internshipApi;