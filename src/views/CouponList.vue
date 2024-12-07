<template>
  <div class="coupon-list">
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab title="未使用" name="unused">
        <coupon-card
          v-for="coupon in coupons.unused"
          :key="coupon.id"
          :coupon="coupon"
          @use="handleUse"
        />
      </van-tab>
      <van-tab title="已使用" name="used">
        <coupon-card
          v-for="coupon in coupons.used"
          :key="coupon.id"
          :coupon="coupon"
        />
      </van-tab>
      <van-tab title="已过期" name="expired">
        <coupon-card
          v-for="coupon in coupons.expired"
          :key="coupon.id"
          :coupon="coupon"
        />
      </van-tab>
    </van-tabs>

    <van-empty 
      v-if="isEmpty" 
      description="暂无优惠券" 
      class="empty-placeholder"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast } from 'vant'
import { getCoupons, useCoupon } from '@/api/coupon'
import CouponCard from '@/components/CouponCard.vue'

const activeTab = ref('unused')
const coupons = ref({
  unused: [],
  used: [],
  expired: []
})

// 判断当前标签页是否为空
const isEmpty = computed(() => {
  const currentCoupons = coupons.value[activeTab.value] || []
  return currentCoupons.length === 0
})

// 获取优惠券列表
const loadCoupons = async () => {
  try {
    const res = await getCoupons()
    if (res.code === 0 && res.data) {
      coupons.value = res.data // 直接使用返回的数据结构
    } else {
      showToast(res.message || '获取优惠券失败')
    }
  } catch (error) {
    console.error('获取优惠券失败:', error)
    showToast('获取优惠券失败')
  }
}

// 使用优惠券
const handleUse = async (coupon) => {
  try {
    const res = await useCoupon(coupon.id)
    if (res.code === 0) {
      showToast('使用成功')
      loadCoupons() // 重新加载列表
    } else {
      showToast(res.message || '使用失败')
    }
  } catch (error) {
    console.error('使用优惠券失败:', error)
    showToast('使用优惠券失败')
  }
}

onMounted(() => {
  loadCoupons()
})
</script>

<style lang="scss" scoped>
.coupon-list {
  min-height: 100vh;
  background: var(--background-color);
  padding-bottom: 20px;
  
  :deep(.van-tabs__wrap) {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #fff;
  }
  
  .empty-placeholder {
    padding: 60px 0;
  }
}
</style> 