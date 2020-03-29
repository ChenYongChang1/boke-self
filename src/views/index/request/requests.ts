import axios from "../../../apis/axios";

const requests = {

  getActives() {
    const payload = {
      jsonMessage: {}, db: "boke", table: "actives",
    };
    return axios.post("/query/getdata", payload);
  },
};
export default requests;
