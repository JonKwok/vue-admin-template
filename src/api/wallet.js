import request from '@/utils/request'

export function getAssetData(data) {
  return request({
    url: '/wallet/asset',
    method: 'post',
    data
  })
}
export function getLiabilityData(data) {
  return request({
    url: '/wallet/liability',
    method: 'post',
    data
  })
}
export function getRevenueData(data) {
  return request({
    url: '/wallet/revenue',
    method: 'post',
    data
  })
}
export function getExpenseData(data) {
  return request({
    url: '/wallet/expense',
    method: 'post',
    data
  })
}

export function getDetailData(data) {
  return request({
    url: '/wallet/detail',
    method: 'post',
    data
  })
}

export function getDetailNext(data) {
  return request({
    url: '/wallet/detail-next',
    method: 'post',
    data
  })
}

export function getDetailInfo(data) {
  return request({
    url: '/wallet/detail-info',
    method: 'post',
    data
  })
}

export function exportExcel(data) {
  return request({
    url: '/wallet/export',
    method: 'post',
    data
  })
}
