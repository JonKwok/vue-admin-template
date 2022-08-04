import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/account/info',
    method: 'get'
  })
}

export function getMenus() {
  return request({
    url: '/menus/list-test',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}
