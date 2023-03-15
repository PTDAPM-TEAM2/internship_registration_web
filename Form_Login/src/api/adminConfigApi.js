import axiosClient from "./axiosClient";
class AdminConfigApi {
  setTTtime = (params, token) => {
    // params =  {"timeStart":"2023-03-05T10:27:48.872+00:00", "timeEnd":"2023-06-05T10:27:48.872+00:00",}
    const url = "/api/registertime/save-tt";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
    // return res, check status với data để xem có thành công ko
  };

  setDAtime = (params, token) => {
    // params =  {"timeStart":"2023-03-05T10:27:48.872+00:00", "timeEnd":"2023-06-05T10:27:48.872+00:00",}
    const url = "/api/registertime/save-da";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
    // return res, check status với data để xem có thành công ko
  };
}

const adminConfigApi = new AdminConfigApi();
export default adminConfigApi;
