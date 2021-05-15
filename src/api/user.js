import request from '@/utils/request'
import axios from 'axios';

let base = '';

export function login(data) {
  console.log(1)
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}
 

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

// export const getTestByHT = params => { return axios.get('http://139.196.34.172:8000/gateway', { params: params }); };

export function getInfo(token) {
  // console.log(3)
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
