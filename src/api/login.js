import { requestServer } from './base'

export const login = function (phone, password, countrycode) {
  return requestServer.get(`/login/cellphone?phone=${phone}&password=${password}&countrycode=${countrycode}`)
}

export const refresh = function () {
  return requestServer.get(`/login/refresh`)
}

export const logout = function () {
  return requestServer.get('/logout')
}

export const logStatus = function () {
  const param = {
    method: 'get',
    url: '/login/status'
  }
  return requestServer.request(param)
}
