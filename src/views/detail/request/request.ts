import axios from '../../../apis/axios'

let requests = {

  getActives(activeId: number | string | null = null) {
    let payload = {
      "jsonMessage": {
        id: activeId
      }, "page": 1, "pageSize": 100, "db": "boke", "table": "actives"
    }
    return axios.post('/query/getdata', payload)
  },

  getMdText(mdId: number | string) {
    let payload = {
      "jsonMessage": {
        id: mdId
      }, "page": 1, "pageSize": 1, "db": "boke", "table": "md"
    }
    return axios.post('/query/getdata', payload)
  },

  getActivesCommonList(mdId: number | string) {
    let payload = {
      "jsonMessage": {
        mdId: mdId
      }, "db": "boke", "table": "common"
    }
    return axios.post('/query/getdata', payload)
  },
  updataCommon(activesCommonList: any, id: string | number) {
    let payload = {
      "query": {
        id: id,
      },
      "jsonMessage": {
        "text": activesCommonList.text,
        "createTime": activesCommonList.createTime,
        "userId": activesCommonList.userId,
        "userNick": activesCommonList.userNick,
        "editFlag": false,
        "childrensShow": false,
        "childrens": activesCommonList.childrens
      },
      "db": "boke", "table": "common"
    }
    return axios.post('/updata/updata', payload)
  },
  addcommon(activesCommonList: any) {
    let payload = {
      "jsonMessage": activesCommonList,
      "db": "boke", "table": "common"
    }
    return axios.post('/add/adddata', payload)
  },
  updataMakedown(markdown: any){
    let payload = {
      "query": {
        id: markdown.id,
      },
      "jsonMessage": {
        "text": markdown.text,
      },
      "db": "boke", "table": "md"
    }
    return axios.post('/updata/updata', payload)
  }


}
export default requests