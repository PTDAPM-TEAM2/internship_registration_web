import axiosClient from "./axiosClient";

class GraduationThesis {
  // dang ky do an
  addOrRemoveGraduation = (params, token) => {
    // params = {"isAccept":1,"status":0,"nameGraduationThesis":"web ban do an 2","student":{"id":5},"lecturer":{"id":2},"semester":{"id": 1}}
    const url = "/api/graduationthesis/save";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res);
  };

  // lay tat ca do an
  getAllSvTt = (params, token) => {
    // params = {}
    const url = "/api/graduationthesis/getAllBySearch";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res);
  };

  // Thong tin cho tiet cua do an thuc tap theo id sinh vien
  importExcelSvDa = (token) => {
    const url = "/api/user/get-current-user/";
    return axiosClient
      .get(url, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
      })
      .then((res) => res);
  };

  //   *******
  // admin dang ky thuc tap cho sinh vien
  internshipRegisterByAd = (params, token) => {
    // params =  {"studentCode":"SV002","studentId" :null,"code": null,"internshipPosition":"be dev","nameCompany":"facebook","email":"facebook@gmail.com","phoneNumber":"01234567899","address":"Hà Nội","taxCode":null,"description":null}

    const url = "/api/internship/register-internship";
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
        },
      })
      .then((res) => res);
    // return res, méo biết trả về j, file danh sách api ko thấy nói nên cứ check cả data với status code
  };

  weeklyTeacherSaving = (params, token) => {
    const url = '/api/weeklyreview/save'
    return axiosClient
      .post(url, params, {
        headers: {
          Authorization: "Bearer " + token,
        }
      }).then((res) => res);
  }

  weeklyTeacherReview = (id, token) => {
    const url = `/api/weeklyreview/getAllByGraduationThesisId/`;
    return axiosClient.get(url + id, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then((res) => res);
  }
  insertPDF = (data, token) => {
    const url = `/api/graduationthesis/add-outline`;
    return axiosClient.post(url,data, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).then((res) => res);
  }


  importExcelMark = (token) => {
    const url = "/api/graduationthesis/import-mark";
    return axiosClient
      .post(url, {
        headers: {
          Authorization: "Bearer " + token, //the token is a variable which holds the token
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
      })
      .then((res) => res);
  };
}

const graduationThesis = new GraduationThesis();
export default graduationThesis;
