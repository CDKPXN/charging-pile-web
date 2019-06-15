
//const localSrc= "http://106.75.173.82:8082"
const localSrc= "http://192.168.0.127:8083"
//  const localSrc="http://192.168.0.117:8082"
// const localSrc= "http://localhost:8082"
// const localSrc="http://192.168.0.156:8082"
// const localSrc = "http://106.75.166.143:8082"
const token = sessionStorage.getItem('token')

module.exports = {
    localSrc,
    token
}
