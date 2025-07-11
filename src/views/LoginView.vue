<template>
  <PhoneFrame>
    <div class="h-full w-full bg-black flex flex-col relative overflow-hidden">
      
    <!-- 所有内容 -->
    <div class="h-full w-full flex flex-col relative">
      <!-- 视频背景 -->
      <video 
        autoplay 
        muted 
        loop 
        playsinline
        class="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/login-background.mp4" type="video/mp4">
        <!-- 视频加载失败时的降级背景 -->
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
      </video>
      
      <!-- 视频加载失败时的备用背景 -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 z-0" style="z-index: -1;"></div>
      
      <!-- 渐变遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10"></div>
      
      <!-- 内容容器 -->
      <div class="relative z-20 h-full flex flex-col text-white px-8">
        <!-- 顶部 Logo -->
        <header class="flex-shrink-0 pt-12 pb-4 text-center">
          <h1 class="text-3xl font-bold tracking-wider">HealthWatch</h1>
        </header>

        <!-- 中间内容区域 - 使用flex-1来占据剩余空间 -->
        <main class="flex-1 flex flex-col justify-end pb-4">
          <div class="space-y-8">
            <!-- 主标语 -->
            <div class="text-left">
              <h2 class="text-4xl font-semibold leading-snug">充分利用您的<br>健康数据。</h2>
              <div class="w-16 h-0.5 bg-white mt-4"></div>
            </div>

            <!-- 功能列表 -->
            <div class="space-y-5">
              <div class="flex items-center space-x-4 feature-item">
                <svg class="w-7 h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                <p class="text-base font-medium">实时健康监测 + 智能分析</p>
              </div>
              <div class="flex items-center space-x-4 feature-item">
                <svg class="w-7 h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                <p class="text-base font-medium">个性化健康建议和运动指导</p>
              </div>
              <div class="flex items-center space-x-4 feature-item">
                <svg class="w-7 h-7 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p class="text-base font-medium">智能手环连接 + 数据同步</p>
              </div>
            </div>

            <!-- 探索功能 -->
            <button @click="exploreApp" class="flex items-center text-lg font-medium group explore-btn">
              <span class="mr-2">探索</span>
              <svg class="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
          </div>
        </main>

        <!-- 底部操作区 -->
        <footer class="flex-shrink-0 pb-safe-bottom">
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <button @click="showRegister = true" class="flex-1 bg-white text-black font-semibold py-3.5 rounded-full text-base transition-transform active:scale-95">
                创建帐户
              </button>
              <button @click="showLoginForm = true" class="flex-1 border border-white/80 text-white/90 font-semibold py-3.5 rounded-full text-base transition-transform active:scale-95">
                登录
              </button>
            </div>
            <!-- Home Indicator -->
            <div class="w-36 h-1.5 bg-white/90 rounded-full mx-auto mt-6 mb-2"></div>
          </div>
        </footer>
      </div>

      <!-- 模态框 -->
      <div v-if="showLoginForm" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end">
        <div class="w-full bg-white rounded-t-3xl p-8 transform transition-transform duration-300 ease-out">
          <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-8"></div>
          <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">欢迎回来</h3>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <input type="tel" v-model="phoneNumber" placeholder="手机号" class="w-full bg-gray-50 text-gray-900 placeholder-gray-500 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-0 text-lg" required>
            </div>
            <div>
              <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="密码" class="w-full bg-gray-50 text-gray-900 placeholder-gray-500 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-0 text-lg" required>
            </div>
            <button type="submit" :disabled="isLoading" class="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl hover:bg-blue-700 transition-colors disabled:opacity-50 text-lg">
              登录
            </button>
          </form>
          <div class="flex justify-between items-center mt-6">
            <button @click="showLoginForm = false" class="text-gray-500 text-sm">取消</button>
            <button class="text-blue-600 text-sm font-medium">忘记密码？</button>
          </div>
        </div>
      </div>

      <div v-if="showRegister" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end">
        <div class="w-full bg-white rounded-t-3xl p-8 transform transition-transform duration-300 ease-out">
          <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-8"></div>
          <h3 class="text-2xl font-bold text-gray-900 text-center mb-4">创建账户</h3>
          <p class="text-gray-600 text-center mb-8">加入HealthWatch，开启健康生活</p>
          <div class="space-y-4 mb-8">
            <button class="w-full bg-gray-50 text-gray-900 py-4 rounded-2xl font-medium text-lg">使用手机号注册</button>
            <button class="w-full bg-gray-50 text-gray-900 py-4 rounded-2xl font-medium text-lg">使用邮箱注册</button>
          </div>
          <button @click="showRegister = false" class="w-full text-gray-500 text-sm py-2">
            暂不注册
          </button>
        </div>
      </div>
    </div>
    </div>
  </PhoneFrame>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PhoneFrame from '../components/PhoneFrame.vue'

const router = useRouter()

// 响应式数据
const phoneNumber = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const showRegister = ref(false)
const showLoginForm = ref(false)

// 登录处理
const handleLogin = async () => {
  if (!phoneNumber.value || !password.value) {
    alert('请填写完整的登录信息')
    return
  }

  isLoading.value = true
  
  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 这里应该调用真实的登录API
    // const response = await loginAPI(phoneNumber.value, password.value)
    
    // 登录成功，设置临时登录状态（仅在当前会话有效）
    sessionStorage.setItem('tempLoginStatus', 'true')
    
    // 触发状态更新事件
    window.dispatchEvent(new Event('loginStatusChanged'))
    
    // 关闭登录表单
    showLoginForm.value = false
    
    // 跳转到主页
    router.push('/home')
  } catch (error) {
    alert('登录失败，请检查用户名和密码')
  } finally {
    isLoading.value = false
  }
}

// 探索应用
const exploreApp = () => {
  router.push('/explore')
}

// 快速体验（保留原功能，可在其他地方使用）
const quickLogin = () => {
  // 设置临时登录状态
  sessionStorage.setItem('tempLoginStatus', 'true')
  
  // 触发状态更新事件
  window.dispatchEvent(new Event('loginStatusChanged'))
  
  router.push('/home')
}
</script>

<style scoped>
/* 确保完全填充手机边框 */
.h-screen {
  height: 100vh;
  height: 100dvh; /* 动态视口高度，更好地适配移动设备 */
}

/* 在PhoneFrame内时的调整 */
@media (min-width: 768px) {
  .h-screen {
    height: 100%;
  }
}

/* 安全区域适配 */
.pb-safe-bottom {
  padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
}

/* 移除旧样式，添加新样式 */
.feature-item, .explore-btn {
  transition: transform 0.2s ease-out;
}

.feature-item:hover {
  transform: translateX(4px);
}

.explore-btn:hover {
  transform: translateX(4px);
}

/* 视频背景优化 */
video {
  pointer-events: none; /* 防止视频拦截点击事件 */
  object-fit: cover; /* 确保视频完全覆盖背景 */
  object-position: center; /* 视频居中显示 */
}

/* 隐藏视频控制栏 */
video::-webkit-media-controls {
  display: none !important;
}

video::-webkit-media-controls-panel {
  display: none !important;
}

video::-webkit-media-controls-play-button {
  display: none !important;
}

video::-webkit-media-controls-start-playback-button {
  display: none !important;
}

/* 提升视频性能 */
video {
  will-change: transform;
  transform: translateZ(0);
}

/* 模态框动画 */
.fixed .transform {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* 移动设备优化 */
@media (max-height: 667px) {
  /* iPhone SE 等小屏设备优化 */
  header {
    padding-top: 0.75rem !important;
    padding-bottom: 0.5rem !important;
  }
  
  .text-4xl {
    font-size: 2rem !important;
    line-height: 2.25rem !important;
  }
  
  .space-y-8 > * + * {
    margin-top: 1.5rem !important;
  }
  
  .space-y-5 > * + * {
    margin-top: 1rem !important;
  }
}

@media (max-height: 568px) {
  /* iPhone 5 等更小屏设备 */
  .text-3xl {
    font-size: 1.5rem !important;
  }
  
  .text-4xl {
    font-size: 1.75rem !important;
    line-height: 2rem !important;
  }
  
  .space-y-8 > * + * {
    margin-top: 1rem !important;
  }
}

/* 确保在横屏模式下也正确显示 */
@media (orientation: landscape) and (max-height: 500px) {
  header {
    padding-top: 0.5rem !important;
    padding-bottom: 0.25rem !important;
  }
  
  .space-y-8 > * + * {
    margin-top: 1rem !important;
  }
  
  .space-y-5 > * + * {
    margin-top: 0.75rem !important;
  }
}

/* 按钮交互效果 */
button:active {
  transform: scale(0.98);
}

/* 状态栏图标动画 */
.status-icon {
  transition: all 0.2s ease-in-out;
}

/* 功能介绍项悬停效果 */
.feature-item:hover {
  transform: translateX(8px);
  transition: transform 0.2s ease-out;
}

/* 探索按钮悬停效果 */
.explore-btn:hover svg {
  transform: translateX(4px);
}

/* 输入框焦点效果 */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* 按钮涟漪效果 */
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple:active::before {
  width: 300px;
  height: 300px;
}
</style> 