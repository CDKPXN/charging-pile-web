import axios from 'axios'
axios.defaults.timeout = 10000
// axios.defaults.baseURL = "http://106.75.173.82:8082";
axios.defaults.baseURL = "http://106.75.166.143:8082";
axios.defaults.headers.post['token'] = sessionStorage.getItem('token')
export default {
  get_data (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  get_null (url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post_data (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put_data (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

}
