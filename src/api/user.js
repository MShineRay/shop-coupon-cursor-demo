import request from '@/utils/request'
import Mock from 'mockjs'

// API接口
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function sendSmsCode(phone) {
  return request({
    url: '/user/sendSms',
    method: 'post',
    data: { phone }
  })
}

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function getQueueInfo() {
  return request({
    url: '/user/queue',
    method: 'get'
  })
}

// Mock数据
if (process.env.NODE_ENV === 'development') {
  const Random = Mock.Random

  // 模拟登录响应
  Mock.mock(/\/api\/user\/login/, 'post', (options) => {
    const { phone, code } = JSON.parse(options.body)
    if (phone && code === '1234') {
      return {
        code: 0,
        data: {
          token: Random.string('alpha', 32),
          userId: Random.id(),
          phone
        },
        message: '登录成功'
      }
    }
    return {
      code: -1,
      message: '手机号或验证码错误'
    }
  })

  // 模拟发送验证码响应
  Mock.mock(/\/api\/user\/sendSms/, 'post', (options) => {
    const { phone } = JSON.parse(options.body)
    if (/^1[3-9]\d{9}$/.test(phone)) {
      return {
        code: 0,
        data: {
          code: '1234'
        }
      }
    }
    return {
      code: -1,
      message: '手机号格式错误'
    }
  })
} 