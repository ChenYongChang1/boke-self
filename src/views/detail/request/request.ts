import axios from '../../../apis/axios'

let requests =  {
  getMdtest(payload:any = {"jsonMessage":{},"page":1,"pageSize":100,"db":"boke","table":"md"}){
    return axios.post('/query/getdata', payload)
  }




}
export default requests