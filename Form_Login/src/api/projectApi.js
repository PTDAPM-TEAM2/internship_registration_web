import axiosClient from "../axiosClient";
class ProjectApi {
  // lay tat ca do an
  //   getAll = () => {
  //     const url = "/api/???/getAll";
  //     // return JSON.parse(axiosClient.get(url));
  //     var responseBody = `[{"STT": 1, "DoAn": "Quản lý du học sinh Việt Nam", "SinhVien": "Nguyễn Đức Tâm", "GiaoVien": "Cù Việt Dũng", "Ky": "01/2022-2023"},{"STT": 2, "DoAn": "Quản lý du học sinh Việt Nam", "SinhVien": "Hoàng Nam","GiaoVien": "Cù Việt Dũng", "Ky": "01/2022-2023"},{"STT": 3, "DoAn": "Quản lý du học sinh Việt Nam", "SinhVien": "Lương nam", "GiaoVien": "Cù Việt Dũng", "Ky": "01/2022-2023"}]`;
  //     var objLst = JSON.parse(responseBody);
  //     return objLst;
  //   };
}

const projectApi = new ProjectApi();
export default projectApi;
