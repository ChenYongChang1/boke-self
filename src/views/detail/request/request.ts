import axios from "../../../apis/axios";

const requests = {

  getActives(activeId: number | string | null = null) {
    const payload = {
      jsonMessage: {
        id: activeId,
      }, page: 1, pageSize: 100, db: "boke", table: "actives",
    };
    return axios.post("/query/getdata", payload);
  },

  getMdText(mdId: number | string) {
    const payload = {
      jsonMessage: {
        id: mdId,
      }, page: 1, pageSize: 1, db: "boke", table: "md",
    };
    return axios.post("/query/getdata", payload);
  },

  getActivesCommonList(mdId: number | string) {
    const payload = {
      jsonMessage: {
        mdId,
      }, db: "boke", table: "common",
    };
    return axios.post("/query/getdata", payload);
  },
  updataCommon(activesCommonList: any, id: string | number) {
    const payload = {
      query: {
        id,
      },
      jsonMessage: {
        text: activesCommonList.text,
        createTime: activesCommonList.createTime,
        userId: activesCommonList.userId,
        userNick: activesCommonList.userNick,
        editFlag: false,
        childrensShow: false,
        childrens: activesCommonList.childrens,
      },
      db: "boke", table: "common",
    };
    return axios.post("/updata/updata", payload);
  },
  addcommon(activesCommonList: any) {
    const payload = {
      jsonMessage: activesCommonList,
      db: "boke", table: "common",
    };
    return axios.post("/add/adddata", payload);
  },
  addMakedown(markdown: any) {
    const payload = {
      jsonMessage: markdown,
      db: "boke", table: "md",
    };
    return axios.post("/add/adddata", payload);
  },
  updataMakedown(markdown: any) {
    const payload = {
      query: {
        id: markdown.id,
      },
      jsonMessage: {
        text: markdown.text,
      },
      db: "boke", table: "md",
    };
    return axios.post("/updata/updata", payload);
  },


};
export default requests;
