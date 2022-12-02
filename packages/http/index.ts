import axios from 'axios'

const request = axios.create({
  timeout: 30000,
  baseURL: '/api'
})

export default request
