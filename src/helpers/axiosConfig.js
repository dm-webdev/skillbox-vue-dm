import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vue-tzr.skillbox.cc/api/'
})

export default instance
