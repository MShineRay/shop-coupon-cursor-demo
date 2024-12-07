<template>
  <div class="app-container">
    <!-- 路由视图 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 全局加载提示 -->
    <van-overlay :show="loading" class="loading-overlay">
      <van-loading type="spinner" color="#1989fa" />
    </van-overlay>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

// 全局加载状态
const loading = ref(false)
provide('globalLoading', loading)

// 路由实例
const router = useRouter()

// 路由守卫
router.beforeEach((to, from, next) => {
  // 重置加载状态
  loading.value = false
  
  // 检查登录状态
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

// 错误处理
const handleError = (error) => {
  console.error('Global error:', error)
  loading.value = false
}

// 提供全局错误处理
provide('handleError', handleError)
</script>

<style lang="scss">
// 重置默认样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.5;
}

.app-container {
  min-height: 100vh;
  position: relative;
  
  // 移动端适配：最大宽度限制
  @media screen and (min-width: 576px) {
    max-width: 576px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}

// 页面切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 全局加载样式
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  
  .van-loading {
    padding: 20px;
  }
}
</style> 