import axios from '../../apis/axios'

const requests = {
  getOssSign(payload: { dir: 'cyc-save' }) {
    return axios.post('/add/getSignOss', payload)
  },
  uploadImg(host: string, request: FormData) {
    return axios.post(host, request, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: false
    })
  },
  
}

export default requests