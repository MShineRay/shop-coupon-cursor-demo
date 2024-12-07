import request from '@/utils/request'

// 获取优惠券列表
export function getCoupons(params) {
  return request({
    url: '/api/coupon/list',
    method: 'get',
    params
  })
}

// 使用优惠券
export function useCoupon(id) {
  return request({
    url: `/api/coupon/use/${id}`,
    method: 'post'
  })
}

// 领取优惠券
export function receiveCoupon(id) {
  return request({
    url: `/api/coupon/receive/${id}`,
    method: 'post'
  })
}

// 获取优惠券详情
export function getCouponDetail(id) {
  return request({
    url: `/api/coupon/detail/${id}`,
    method: 'get'
  })
}

// 获取优惠券统计信息
export function getCouponStatistics() {
  return request({
    url: '/api/coupon/statistics',
    method: 'get'
  })
} 