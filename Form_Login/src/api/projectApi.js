import axiosClient from "./axiosClient";
class ProjectApi {
  // lay tat ca giang vien huong dan do an
  getAllDa = (params, token) => {
    // param co the de trong, neu can tim hoac loc sinh se truyen param
    const url = "api/graduationthesis/getAllBySearch";
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

const projectApi = new ProjectApi();
export default projectApi;
