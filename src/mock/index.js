import Mock from 'mockjs'

const Random = Mock.Random

// ... 之前的用户相关 mock 代码 ...

// 优惠券相关接口
Mock.mock(/\/api\/coupon\/list/, 'get', () => {
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
    type: Random.pick(['discount', 'cash']), // 优惠券类型：折扣券或现金券
    discount: Random.float(0.1, 0.9, 1, 1), // 折扣力度，仅折扣券有效
    description: Random.pick([
      '仅限周末使用',
      '仅限堂食使用',
      '特价商品不可用',
      '部分商品不可用'
    ]),
    rules: [
      '单笔订单限用一张',
      '不可与其���优惠同时使用',
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

  // 生成不同状态的优惠券列表
  const generateCouponList = (status, count = 5) => {
    return Array(count).fill(null).map(() => generateCoupon(status))
  }

  return {
    code: 0,
    data: {
      unused: generateCouponList('unused', Random.integer(3, 8)),
      used: generateCouponList('used', Random.integer(2, 5)),
      expired: generateCouponList('expired', Random.integer(1, 4))
    },
    message: '获取成功'
  }
})

// 使用优惠券
Mock.mock(/\/api\/coupon\/use\/\w+/, 'post', (options) => {
  // 从URL中提取优惠券ID
  const id = options.url.match(/\/use\/(\w+)/)[1]
  
  return {
    code: 0,
    data: {
      id,
      useTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      orderNo: Random.string('upper', 16), // 关联的订单号
      usedAmount: Random.integer(50, 500) // 实际使用的订单金额
    },
    message: '优惠券使用成功'
  }
})

// 领取优惠券
Mock.mock(/\/api\/coupon\/receive\/\w+/, 'post', (options) => {
  // 从URL中提取优惠券ID
  const id = options.url.match(/\/receive\/(\w+)/)[1]
  
  if (Random.boolean(9, 1)) { // 90%的概率领取成功
    return {
      code: 0,
      data: generateCoupon('unused'), // 生成一个未使用的优惠券
      message: '领取成功'
    }
  } else {
    return {
      code: -1,
      message: Random.pick([
        '优惠券已领完',
        '您已领取过该优惠券',
        '活动未开始',
        '活动已结束'
      ])
    }
  }
})

// 优惠券详情
Mock.mock(/\/api\/coupon\/detail\/\w+/, 'get', (options) => {
  // 从URL中提取优惠券ID
  const id = options.url.match(/\/detail\/(\w+)/)[1]
  
  return {
    code: 0,
    data: {
      ...generateCoupon(Random.pick(['unused', 'used', 'expired'])),
      id,
      receiveTime: Random.date('yyyy-MM-dd HH:mm:ss'),
      validPeriod: Random.integer(7, 30) + '天',
      useConditions: [
        '单笔订单满' + Random.integer(100, 1000) + '元可用',
        Random.pick(['限时段：周一至周五', '限时段：周末', '限时段：全天']),
        Random.pick(['限品类：美食', '限品类：生鲜', '限品类：全品类']),
      ],
      useInstructions: [
        '每人限领1张',
        '每单限用1张',
        '不与其他优惠叠加',
        Random.pick([
          '仅限堂食使用',
          '仅限外卖使用',
          '堂食外卖均可使用'
        ])
      ]
    },
    message: '获取成功'
  }
})

// 优惠券统计信息
Mock.mock('/api/coupon/statistics', 'get', () => {
  return {
    code: 0,
    data: {
      totalCount: Random.integer(10, 20),
      unusedCount: Random.integer(5, 10),
      usedCount: Random.integer(3, 8),
      expiredCount: Random.integer(1, 5),
      nearExpireCount: Random.integer(1, 3), // 即将过期的数量
      todayReceived: Random.integer(0, 3), // 今日领取的数量
      monthUsed: Random.integer(2, 8), // 本月使用的数量
      totalSaved: Random.float(100, 1000, 2, 2) // 总计节省金额
    },
    message: '获取成功'
  }
})

export default Mock 