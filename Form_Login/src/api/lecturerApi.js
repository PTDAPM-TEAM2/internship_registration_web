import axiosClient from "./axiosClient";
class LecturerApi {
  getAllGV = () => {
    const url = "api/lecturer/get-all";
    const token = localStorage.getItem("token");
    console.log(token);
    return axiosClient
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res);
  };

  addGV = (data, token) => {
    const url = "api/lecturer/save";
    return axiosClient
      .post(url, data, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
  };

  updateGV = (params, id) => {
    const url = `api/lecturer/update/${id}`;
    const token = localStorage.getItem('token');
    return axiosClient
      .put(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          // 'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
      // day la ham update
  };

  deleteGV = (id) => {
    const url = `api/lecturer/delete/${id}`;
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

}

const lecturerApi = new LecturerApi();
export default lecturerApi;
