import request from '@/utils/request'
import {getToken} from '@/utils/auth'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'http://api.yusj.vip/index.php?s=User.User.selecttoken&searchToken='+getToken(),
    method: 'get',
    params: { token }
  })
}

