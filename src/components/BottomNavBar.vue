<template>
  <div class="absolute bottom-0 left-0 right-0 h-24 bg-black/80 backdrop-blur-lg rounded-t-3xl">
    <div class="flex justify-around items-center h-full px-2 relative">
      <!-- 动态指示器 -->
      <div 
        class="absolute top-2 h-1 bg-blue-400 rounded-full transition-all duration-300 ease-out"
        :style="indicatorStyle"
      ></div>
      
      <!-- 积分 -->
      <router-link 
        ref="pointsRef"
        to="/points" 
        class="nav-item text-center flex flex-col items-center justify-center relative transition-all duration-300 ease-out hover:scale-110"
        @click="updateIndicator"
      >
        <div class="nav-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <span class="nav-text">积分</span>
        <div class="nav-ripple"></div>
      </router-link>
      
      <!-- 数据 -->
      <router-link 
        ref="dataRef"
        to="/data" 
        class="nav-item text-center flex flex-col items-center justify-center relative transition-all duration-300 ease-out hover:scale-110"
        @click="updateIndicator"
      >
        <div class="nav-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span class="nav-text">数据</span>
        <div class="nav-ripple"></div>
      </router-link>
      
      <!-- Health Agent -->
      <router-link 
        ref="homeRef"
        to="/home" 
        class="nav-item text-center flex flex-col items-center justify-center relative transition-all duration-300 ease-out hover:scale-110"
        @click="updateIndicator"
      >
        <div class="nav-icon-container special-icon">
          <svg class="nav-icon-special" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.28 15.35c-.2.2-.45.3-.72.3s-.52-.1-.72-.3c-.4-.4-.4-1.05 0-1.45L12.58 13H9.5c-.55 0-1-.45-1-1s.45-1 1-1h4.5c.28 0 .53.11.71.29.18.18.29.43.29.71v4.5c0 .55-.45 1-1 1s-1-.45-1-1v-3.08l-3.07 3.08z"/>
          </svg>
        </div>
        <span class="nav-text font-bold">Agent</span>
        <div class="nav-ripple"></div>
      </router-link>
      
      <!-- 日程 -->
      <router-link 
        ref="scheduleRef"
        to="/schedule" 
        class="nav-item text-center flex flex-col items-center justify-center relative transition-all duration-300 ease-out hover:scale-110"
        @click="updateIndicator"
      >
        <div class="nav-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span class="nav-text">日程</span>
        <div class="nav-ripple"></div>
      </router-link>
      
      <!-- 设置 -->
      <router-link 
        ref="settingsRef"
        to="/settings" 
        class="nav-item text-center flex flex-col items-center justify-center relative transition-all duration-300 ease-out hover:scale-110"
        @click="updateIndicator"
      >
        <div class="nav-icon-container">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <span class="nav-text">设置</span>
        <div class="nav-ripple"></div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 引用各个导航项
const pointsRef = ref(null)
const dataRef = ref(null)
const homeRef = ref(null)
const scheduleRef = ref(null)
const settingsRef = ref(null)

// 指示器样式
const indicatorStyle = ref({
  width: '0px',
  left: '0px',
  opacity: 0
})

// 获取活跃导航项的引用
const getActiveNavRef = () => {
  const path = route.path
  switch (path) {
    case '/points': return pointsRef.value
    case '/data': return dataRef.value
    case '/home': return homeRef.value
    case '/schedule': return scheduleRef.value
    case '/settings': return settingsRef.value
    default: return homeRef.value
  }
}

// 更新指示器位置
const updateIndicator = async () => {
  await nextTick()
  const activeElement = getActiveNavRef()
  
  if (activeElement && typeof activeElement.getBoundingClientRect === 'function') {
    const rect = activeElement.getBoundingClientRect()
    const parentRect = activeElement.parentElement.getBoundingClientRect()
    
    indicatorStyle.value = {
      width: `${rect.width * 0.6}px`,
      left: `${rect.left - parentRect.left + (rect.width * 0.2)}px`,
      opacity: 1
    }
  } else {
    // 如果元素不存在，则隐藏指示器
    indicatorStyle.value.opacity = 0
  }
}

// 监听路由变化
watch(() => route.path, () => {
  setTimeout(updateIndicator, 100)
}, { immediate: true })

onMounted(() => {
  setTimeout(updateIndicator, 100)
})
</script>

<style scoped>
.nav-item {
  @apply text-gray-400 p-2 relative overflow-hidden;
  min-width: 60px;
}

.nav-item:hover {
  @apply text-gray-300;
}

.nav-icon-container {
  @apply mb-1 relative z-10 transition-all duration-300 ease-out;
}

.nav-icon {
  @apply w-6 h-6 mx-auto transition-all duration-300 ease-out;
}

.nav-icon-special {
  @apply w-7 h-7 mx-auto transition-all duration-300 ease-out;
}

.special-icon {
  @apply transform transition-transform duration-300 ease-out;
}

.nav-text {
  @apply text-xs relative z-10 transition-all duration-300 ease-out;
}

/* 波纹效果 */
.nav-ripple {
  @apply absolute inset-0 rounded-full transform scale-0 bg-blue-400/20 transition-transform duration-300 ease-out;
}

.nav-item:active .nav-ripple {
  @apply scale-150;
}

/* 活跃状态样式 */
.router-link-active,
.router-link-exact-active {
  @apply text-blue-400;
}

.router-link-active .nav-icon,
.router-link-exact-active .nav-icon,
.router-link-active .nav-icon-special,
.router-link-exact-active .nav-icon-special {
  @apply text-blue-400 transform scale-110;
}

.router-link-active .nav-text,
.router-link-exact-active .nav-text {
  @apply text-blue-400 font-medium;
}

.router-link-active .nav-icon-container,
.router-link-exact-active .nav-icon-container {
  @apply transform -translate-y-0.5;
}

/* Agent按钮特殊效果 */
.router-link-active .special-icon,
.router-link-exact-active .special-icon {
  @apply transform scale-110 rotate-12;
}

/* 悬停时的微动画 */
.nav-item:hover .nav-icon-container {
  @apply transform -translate-y-0.5;
}

.nav-item:hover .nav-icon,
.nav-item:hover .nav-icon-special {
  @apply transform scale-105;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .nav-item {
    min-width: 50px;
  }
  
  .nav-icon,
  .nav-icon-special {
    @apply w-5 h-5;
  }
  
  .nav-text {
    @apply text-xs;
  }
}

/* 指示器动画 */
.absolute.top-2 {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 整体容器的入场动画 */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.absolute.bottom-0 {
  animation: slideUp 0.6s ease-out;
}
</style> 