import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vue-study.skillbox.cc/api/'
})

export default instance
