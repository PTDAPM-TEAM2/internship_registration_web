import axiosClient from "../axiosClient";
class CompanyApi{
    getAll = () =>{
        const url = '/api/company/getAll';
        // return JSON.parse(axiosClient.get(url));
        var responseBody = `[{"STT": 1, "Ma": "001", "Ten": "APANZO", "SDT": "0123456789", "Email": "apz123@gmail.com"}, {"STT": 2, "Ma": "002", "Ten": "APANZO", "SDT": "0123456789", "Email": "apz123@gmail.com"}, {"STT": 3, "Ma": "003", "Ten": "APANZO", "SDT": "0123456789", "Email": "apz123@gmail.com"}]`;
        var objLst = JSON.parse(responseBody);
        return objLst;
    }
}

const companyApi = new CompanyApi();
export default companyApi;