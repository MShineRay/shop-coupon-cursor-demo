<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="phone"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="code"
          center
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click="sendCode"
              :disabled="counting > 0"
            >
              {{ counting > 0 ? `${counting}s后重发` : '发送验证码' }}
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { login, sendSmsCode } from '@/api/user'

const router = useRouter()
const phone = ref('')
const code = ref('')
const counting = ref(0)

const sendCode = async () => {
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    showToast('请输入正确的手机号')
    return
  }
  try {
    await sendSmsCode(phone.value)
    counting.value = 60
    const timer = setInterval(() => {
      counting.value--
      if (counting.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (error) {
    console.error(error)
  }
}

const onSubmit = async () => {
  try {
    const res = await login({
      phone: phone.value,
      code: code.value
    })
    localStorage.setItem('token', res.data.token)
    router.push('/queue')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style> 