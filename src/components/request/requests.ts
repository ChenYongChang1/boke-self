import axios from "../../apis/axios";

const requests = {
  getOssSign(payload: { dir: "cyc-save" }) {
    return axios.post("/add/getSignOss", payload);
  },
  uploadImg(host: string, request: FormData) {
    return axios.post(host, request, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: false,
    });
  },
  loginRequest(user: any) {
    const payload = {
      jsonMessage: user, db: "boke", table: "user",
    };
    return axios.post("/query/getdata", payload);
  },
  getAdminUserInfo() {
    const payload = {
      jsonMessage: {
        adminUser: true,
      }, db: "boke", table: "user",
    };
    return axios.post("/query/getdata", payload);
  },
  liuyanSend(user: any) {
    const payload = {
      jsonMessage: user, db: "boke", table: "message",
    };
    return axios.post("/add/adddata", payload);
  },
  addUser(user: any) {
    const payload = {
      jsonMessage: user, db: "boke", table: "user",
    };
    return axios.post("/add/adddata", payload);
  },
};

export default requests;
