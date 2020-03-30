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
  addActives(actives: any) {
    const payload = {
      jsonMessage: actives, db: "boke", table: "actives",
    };
    return axios.post("/add/adddata", payload);
  },
  changeAdminCover(cover: any){
    const payload = {
      query: {
        'adminUser': true,
      },
      jsonMessage: cover,
      db: "boke", table: "user",
    };
    return axios.post("/updata/updata", payload);
  }
};

export default requests;
