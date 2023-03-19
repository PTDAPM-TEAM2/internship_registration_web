import axiosClient from "./axiosClient";
class LecturerApi {
  // lay tat ca giang vien huong dan do an
  getAllGV = (params, token) => {
    // param co the de trong, neu can tim hoac loc sinh se truyen param
    const url = "api/lecturer/getLecturersBySearch";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token,
          //the token is a variable which holds the token
        },
      })
      .then((res) => res);
  };

}

const lecturerApi = new LecturerApi();
export default lecturerApi;
