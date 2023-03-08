import axiosClient from "../axiosClient";
class StudentApi {


  getAll = (token) => {
    const url = "api/student/get-st-da-by-search";
    return axiosClient.get(url,{headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }}).then(res => res);
  };


  
}

const studentApi = new StudentApi();
export default studentApi;