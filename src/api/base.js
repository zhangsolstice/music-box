import axios from 'axios'

export const requestServer = axios.create({
  baseURL: 'http://192.168.1.6:3000',
  withCredentials: true
})
