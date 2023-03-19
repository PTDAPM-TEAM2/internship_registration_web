import axiosClient from "./axiosClient";
class lecturerApi {
  // lay tat ca giang vien huong dan do an
  getAllSvDa = (params, token) => {
    // param co the de trong, neu can tim hoac loc sinh se truyen param
    const url = "api/lecturer/get-st-da-by-search";
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

const lecturerApi = new lecturerApi();
export default lecturerApi;
