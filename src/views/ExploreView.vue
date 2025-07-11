<template>
  <PhoneFrame>
    <div class="h-full w-full bg-black flex flex-col relative overflow-hidden">
    <!-- 静态背景 -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 z-0"></div>
    
    <!-- 渐变遮罩层 -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10"></div>
    
    <!-- 内容容器 -->
    <div class="relative z-20 h-full flex flex-col text-white">
      <!-- 顶部导航 -->
      <header class="flex-shrink-0 pt-12 pb-4 px-8 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <h1 class="text-2xl font-bold tracking-wider">HealthWatch</h1>
          <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        <button @click="handleLogin" class="text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all">
          登录
        </button>
      </header>

      <!-- 主内容区域 - 可滚动 -->
      <main class="flex-1 overflow-y-auto">
        <div class="space-y-12 pb-8">
          
          <!-- 品牌故事区域 -->
          <section class="px-8">
            <div class="glassmorphism-card rounded-3xl p-8 space-y-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                <h2 class="text-2xl font-bold">品牌故事</h2>
              </div>
              
              <div class="space-y-4 text-gray-200">
                <p class="text-lg leading-relaxed">
                  HealthWatch 诞生于对健康生活的深度思考。我们相信，每个人都应该拥有属于自己的健康助手。
                </p>
                <p class="leading-relaxed">
                  通过AI技术与健康数据的完美融合，我们打造了一个不仅能监测健康指标，更能理解您生活方式的智能伙伴。
                </p>
                <div class="flex items-center space-x-4 pt-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-blue-400">500K+</div>
                    <div class="text-sm text-gray-400">用户信赖</div>
                  </div>
                  <div class="w-px h-8 bg-gray-600"></div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-green-400">24/7</div>
                    <div class="text-sm text-gray-400">健康监护</div>
                  </div>
                  <div class="w-px h-8 bg-gray-600"></div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-purple-400">AI</div>
                    <div class="text-sm text-gray-400">智能分析</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Teaser视频区域 -->
          <section class="px-8">
            <div class="glassmorphism-card rounded-3xl p-6 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  <h2 class="text-xl font-bold">产品演示</h2>
                </div>
                <div class="text-sm text-gray-400">2:30</div>
              </div>
              
              <!-- 产品演示图片 -->
              <div class="relative bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl overflow-hidden aspect-video border border-white/10">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center space-y-4">
                    <div class="text-6xl">⌚</div>
                    <div class="text-white font-semibold">HealthWatch Pro</div>
                    <div class="text-gray-300 text-sm">智能健康监测</div>
                  </div>
                </div>
                <!-- 装饰性图标 -->
                <div class="absolute top-4 left-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div class="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <div class="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                <div class="absolute bottom-4 right-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
              </div>
              
              <p class="text-gray-300 text-sm">
                体验HealthWatch如何通过AI技术革新您的健康管理
              </p>
            </div>
          </section>

          <!-- 产品概念图区域 -->
          <section class="px-8">
            <div class="glassmorphism-card rounded-3xl p-6 space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
                <h2 class="text-xl font-bold">产品生态</h2>
              </div>
              
              <!-- 产品概念图网格 -->
              <div class="grid grid-cols-2 gap-4">
                <!-- 智能手环 -->
                <div class="bg-gray-900/40 rounded-2xl p-6 text-center hover:bg-gray-800/40 transition-all">
                  <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-white mb-1">智能手环</h3>
                  <p class="text-xs text-gray-400">24/7健康监测</p>
                </div>
                
                <!-- AI助手 -->
                <div class="bg-gray-900/40 rounded-2xl p-6 text-center hover:bg-gray-800/40 transition-all">
                  <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-white mb-1">AI助手</h3>
                  <p class="text-xs text-gray-400">智能健康顾问</p>
                </div>
                
                <!-- 数据分析 -->
                <div class="bg-gray-900/40 rounded-2xl p-6 text-center hover:bg-gray-800/40 transition-all">
                  <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-white mb-1">数据分析</h3>
                  <p class="text-xs text-gray-400">深度健康洞察</p>
                </div>
                
                <!-- 健康商城 -->
                <div class="bg-gray-900/40 rounded-2xl p-6 text-center hover:bg-gray-800/40 transition-all">
                  <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                  </div>
                  <h3 class="font-semibold text-white mb-1">健康商城</h3>
                  <p class="text-xs text-gray-400">精选健康产品</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 商城选项区域 -->
          <section class="px-8">
            <div class="glassmorphism-card rounded-3xl p-6 space-y-6">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                <h2 class="text-xl font-bold">精选推荐</h2>
              </div>
              
              <!-- 商城产品卡片 -->
              <div class="space-y-4">
                <div class="bg-gray-900/40 rounded-2xl p-4 flex items-center space-x-4 hover:bg-gray-800/40 transition-all cursor-pointer">
                  <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span class="text-xl">⌚</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-white">HealthWatch Pro</h3>
                    <p class="text-sm text-gray-400">专业级健康监测手环</p>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="text-lg font-bold text-white">¥1,299</span>
                      <span class="text-sm text-gray-500 line-through">¥1,599</span>
                      <span class="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">限时</span>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-900/40 rounded-2xl p-4 flex items-center space-x-4 hover:bg-gray-800/40 transition-all cursor-pointer">
                  <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span class="text-xl">🏃‍♀️</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-white">AI健康课程</h3>
                    <p class="text-sm text-gray-400">个性化运动与营养指导</p>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="text-lg font-bold text-white">¥299</span>
                      <span class="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">热门</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button @click="exploreStore" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all">
                探索更多产品
              </button>
            </div>
          </section>
        </div>
      </main>

      <!-- 底部操作区 -->
      <footer class="flex-shrink-0 p-8 pb-safe-bottom">
        <div class="space-y-4">
          <div class="flex space-x-3">
            <button @click="startExperience" class="flex-1 bg-white text-black font-semibold py-4 rounded-2xl hover:bg-gray-100 transition-all">
              开始体验
            </button>
            <button @click="learnMore" class="px-6 border border-white/40 text-white font-semibold py-4 rounded-2xl hover:bg-white/10 transition-all">
              了解更多
            </button>
          </div>
          <!-- Home Indicator -->
          <div class="w-36 h-1.5 bg-white/90 rounded-full mx-auto mt-4"></div>
        </div>
      </footer>
    </div>
    </div>
  </PhoneFrame>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PhoneFrame from '../components/PhoneFrame.vue'

const router = useRouter()

// 登录
const handleLogin = () => {
  router.push('/')
}

// 开始体验
const startExperience = () => {
  // 设置临时登录状态
  sessionStorage.setItem('tempLoginStatus', 'true')
  
  // 触发状态更新事件
  window.dispatchEvent(new Event('loginStatusChanged'))
  
  // 直接跳转到商城页面
  router.push('/mall')
}

// 了解更多
const learnMore = () => {
  // 滚动到品牌故事区域
  const element = document.querySelector('main')
  element.scrollTo({ top: 0, behavior: 'smooth' })
}

// 探索商城
const exploreStore = () => {
  // 设置临时登录状态
  sessionStorage.setItem('tempLoginStatus', 'true')
  
  // 触发状态更新事件
  window.dispatchEvent(new Event('loginStatusChanged'))
  
  router.push('/mall')
}
</script>

<style scoped>
/* 确保完全填充手机边框 */
.h-screen {
  height: 100vh;
  height: 100dvh;
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

/* 玻璃形态效果 */
.glassmorphism-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 滚动条样式 */
main::-webkit-scrollbar {
  width: 4px;
}

main::-webkit-scrollbar-track {
  background: transparent;
}

main::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

/* 动画效果 */
.glassmorphism-card {
  transition: all 0.3s ease;
}

.glassmorphism-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
}
</style> 