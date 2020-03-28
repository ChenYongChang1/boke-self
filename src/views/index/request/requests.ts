import axios from '../../../apis/axios'

let requests = {

  getActives() {
    let payload = {
      "jsonMessage": {}, "db": "boke", "table": "actives"
    }
    return axios.post('/query/getdata', payload)
  },
}
export default requests