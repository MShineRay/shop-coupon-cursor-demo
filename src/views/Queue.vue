<template>
  <div class="queue-container">
    <div class="queue-info">
      <van-circle
        v-model="currentNumber"
        :rate="(currentNumber / totalNumber) * 100"
        :speed="100"
        size="120px"
        :text="`当前号码: ${currentNumber}`"
      />
      <div class="queue-stats">
        <p>您的号码：{{ myNumber }}</p>
        <p>前方等待：{{ myNumber - currentNumber }}人</p>
        <p>预计等待时间：{{ ((myNumber - currentNumber) * 2).toFixed(0) }}分钟</p>
      </div>
    </div>
    <van-button type="primary" block @click="checkCoupons">
      查看我的优惠券
    </van-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getQueueInfo } from '@/api/user'

const router = useRouter()
const currentNumber = ref(0)
const totalNumber = ref(100)
const myNumber = ref(0)

onMounted(async () => {
  try {
    const res = await getQueueInfo()
    currentNumber.value = res.data.currentNumber
    myNumber.value = res.data.myNumber
    totalNumber.value = res.data.totalNumber
  } catch (error) {
    console.error(error)
  }
})

const checkCoupons = () => {
  router.push('/coupon-list')
}
</script>

<style lang="scss" scoped>
.queue-container {
  padding: 20px;
  
  .queue-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
  
  .queue-stats {
    margin-top: 20px;
    text-align: center;
    
    p {
      margin: 10px 0;
      color: #666;
    }
  }
}
</style> 