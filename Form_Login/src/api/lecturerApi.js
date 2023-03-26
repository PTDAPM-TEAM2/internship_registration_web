import axiosClient from "./axiosClient";
class LecturerApi {
  getAllGV = () => {
    const url = "api/lecturer/get-all";
    const token = localStorage.getItem("token");
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

  filter = (body) => {
    const url = '/api/lecturer/getLecturersByFilter';
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(body);
    return axiosClient
      .post(url, body , {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          // 'Content-Type': 'application/json'
        },
      })
      .then((res) => res);
    // day la ham update
  };

  importExcel = (data) => {
    // data la file excel
    const url = "api/lecturer/import-excel";
    const token = localStorage.getItem("token");
    return axiosClient
      .post(
        url, data,
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

}

const lecturerApi = new LecturerApi();
export default lecturerApi;
