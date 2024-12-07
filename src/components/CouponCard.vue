<template>
  <div class="coupon-card" :class="coupon.status">
    <div class="amount">
      <span class="symbol">¥</span>
      <span class="number">{{ coupon.amount }}</span>
    </div>
    <div class="info">
      <div class="title">{{ coupon.title }}</div>
      <div class="date">
        有效期至：{{ formatDate(coupon.expireDate) }}
      </div>
    </div>
    <div class="status-tag">
      {{ statusText[coupon.status] }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  coupon: {
    type: Object,
    required: true
  }
})

const statusText = {
  unused: '未使用',
  used: '已使用',
  expired: '已过期'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>

<style lang="scss" scoped>
.coupon-card {
  margin: 10px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  position: relative;
  
  &.used,
  &.expired {
    opacity: 0.6;
  }
  
  .amount {
    color: #f44;
    
    .symbol {
      font-size: 16px;
    }
    
    .number {
      font-size: 32px;
      font-weight: bold;
    }
  }
  
  .info {
    margin-left: 20px;
    flex: 1;
    
    .title {
      font-size: 16px;
      margin-bottom: 8px;
    }
    
    .date {
      font-size: 12px;
      color: #999;
    }
  }
  
  .status-tag {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
    color: #999;
  }
}
</style> 