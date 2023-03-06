import axios from 'axios';
export default class UserApi {
  // url = 'http://localhost:3000'
  async login(username, password) {
    const form = new FormData();
    form.append(username, password);

    // const response = await axios({
    //     method: 'post',
    //     url: `${url}/user`,
    //     data: form,
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-type': 'application/json'
    //     },
    // });
    // return response;
    return `{"access_Token": "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2Nzc3MTg5MjQsInVzZXJuYW1lIjoiYWRtaW4ifQ.avtYRl00lAmDg29le03R7zy7ImlXOIc1p9vvx402DHQ", "statusCode": "200 OK", "messenger": null}`;

  }
}