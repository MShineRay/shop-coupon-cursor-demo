import Mock from 'mockjs'

const Random = Mock.Random

// 生成优惠券数据的辅助函数
const generateCoupon = (status) => ({
  id: Random.id(),
  title: Random.pick([
    '新人专享券',
    '满减优惠券',
    '无门槛优惠券',
    '周末专享券'
  ]),
  amount: Random.pick([10, 20, 30, 50, 100]),
  minAmount: Random.pick([0, 100, 200, 300]),
  status,
  startTime: Random.date('yyyy-MM-dd'),
  expireTime: status === 'expired' 
    ? Random.date('2023-MM-dd') 
    : Random.date('2024-MM-dd'),
  useTime: status === 'used' ? Random.date('yyyy-MM-dd HH:mm:ss') : null,
  type: Random.pick(['discount', 'cash']),
  discount: Random.float(0.1, 0.9, 1, 1),
  description: Random.pick([
    '仅限周末使用',
    '仅限堂食使用',
    '特价商品不可用',
    '部分商品不可用'
  ]),
  rules: [
    '单笔订单限用一张',
    '不可与其他优惠同时使用',
    Random.pick([
      '仅限指定商品使用',
      '全场通用',
      '仅限新用户使用'
    ])
  ],
  shopInfo: {
    id: Random.id(),
    name: Random.cword(4, 8) + Random.pick(['店', '餐厅', '商铺']),
    logo: Random.image('60x60', Random.color(), '#fff', 'Logo')
  }
})

// 优惠券列表接口
Mock.mock('/api/coupon/list', 'get', () => {
  return {
    code: 0,
    data: {
      unused: Array(Random.integer(3, 8)).fill().map(() => generateCoupon('unused')),
      used: Array(Random.integer(2, 5)).fill().map(() => generateCoupon('used')),
      expired: Array(Random.integer(1, 4)).fill().map(() => generateCoupon('expired'))
    },
    message: '获取成功'
  }
})

// 使用优惠券接口
Mock.mock(/\/api\/coupon\/use\/\w+/, 'post', ({ url }) => {
  const id = url.match(/\/use\/(\w+)/)[1]
  return {
    code: 0,
    data: {
      id,
      useTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      orderNo: Random.string('upper', 16),
      usedAmount: Random.integer(50, 500)
    },
    message: '优惠券使用成功'
  }
})

// 领取优惠券接口
Mock.mock(/\/api\/coupon\/receive\/\w+/, 'post', ({ url }) => {
  if (Random.boolean(9, 1)) {
    return {
      code: 0,
      data: generateCoupon('unused'),
      message: '领取成功'
    }
  }
  return {
    code: -1,
    message: Random.pick([
      '优惠券已领完',
      '您已领取过该优惠券',
      '活动未开始',
      '活动已结束'
    ])
  }
})

// 优惠券详情接口
Mock.mock(/\/api\/coupon\/detail\/\w+/, 'get', ({ url }) => {
  const id = url.match(/\/detail\/(\w+)/)[1]
  return {
    code: 0,
    data: {
      ...generateCoupon(Random.pick(['unused', 'used', 'expired'])),
      id,
      receiveTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      validPeriod: Random.integer(7, 30) + '天'
    },
    message: '获取成功'
  }
})

// 优惠券统计接口
Mock.mock('/api/coupon/statistics', 'get', () => {
  return {
    code: 0,
    data: {
      totalCount: Random.integer(10, 20),
      unusedCount: Random.integer(5, 10),
      usedCount: Random.integer(3, 8),
      expiredCount: Random.integer(1, 5),
      nearExpireCount: Random.integer(1, 3),
      todayReceived: Random.integer(0, 3),
      monthUsed: Random.integer(2, 8),
      totalSaved: Random.float(100, 1000, 2, 2)
    },
    message: '获取成功'
  }
}) 