import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/rbac/user-list',
    method: 'post',
    data
  })
}

export function userAdd(data) {
  return request({
    url: '/rbac/user-add',
    method: 'post',
    data
  })
}

export function userEnable(data) {
  return request({
    url: '/rbac/user-enable',
    method: 'post',
    data
  })
}

export function userDisable(data) {
  return request({
    url: '/rbac/user-disable',
    method: 'post',
    data
  })
}
