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

        <!-- 主内容区域 - 横向滚动 -->
        <main ref="scrollContainer" class="flex-1 scroll-container">
          <!-- Slide 1: 品牌故事 -->
          <section class="scroll-slide">
            <div class="h-full flex flex-col justify-end px-8 pb-32">
              <div class="space-y-6 text-left">
                <h2 class="text-4xl font-bold leading-tight">品牌故事</h2>
                <div class="w-16 h-1 bg-white/80 rounded-full"></div>
                <p class="text-lg text-gray-300 leading-relaxed">
                  HealthWatch 诞生于对健康生活的深度思考。我们相信，每个人都应该拥有属于自己的健康助手。
                </p>
                <div class="flex justify-between items-center pt-4 text-center">
                  <div>
                    <div class="text-3xl font-bold text-blue-400">500K+</div>
                    <div class="text-sm text-gray-400 mt-1">用户信赖</div>
                  </div>
                  <div>
                    <div class="text-3xl font-bold text-green-400">24/7</div>
                    <div class="text-sm text-gray-400 mt-1">健康监护</div>
                  </div>
                  <div>
                    <div class="text-3xl font-bold text-purple-400">AI</div>
                    <div class="text-sm text-gray-400 mt-1">智能分析</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Slide 2: 产品演示 -->
          <section class="scroll-slide">
            <div class="h-full flex flex-col justify-end px-8 pb-32">
              <div class="text-center space-y-6">
                <div class="text-8xl">⌚️</div>
                <h2 class="text-4xl font-bold">HealthWatch Pro</h2>
                <p class="text-lg text-gray-300">
                  体验AI技术如何革新您的健康管理。
                </p>
                <div class="inline-block bg-white/10 text-white text-sm px-4 py-2 rounded-full border border-white/20">
                  产品演示视频 - 2:30
                </div>
              </div>
            </div>
          </section>

          <!-- Slide 3: 产品生态 -->
          <section class="scroll-slide">
            <div class="h-full flex flex-col justify-end px-8 pb-32">
              <div class="space-y-6 text-left">
                <h2 class="text-4xl font-bold leading-tight">一个完整的<br>健康生态</h2>
                <div class="w-16 h-1 bg-white/80 rounded-full"></div>
                <div class="space-y-4 pt-2">
                  <div class="flex items-center space-x-4"><div class="w-8 h-8 flex-shrink-0 bg-blue-500/20 rounded-lg flex items-center justify-center">📱</div><span>智能手环 - 24/7健康监测</span></div>
                  <div class="flex items-center space-x-4"><div class="w-8 h-8 flex-shrink-0 bg-purple-500/20 rounded-lg flex items-center justify-center">🤖</div><span>AI助手 - 您的私人健康顾问</span></div>
                  <div class="flex items-center space-x-4"><div class="w-8 h-8 flex-shrink-0 bg-green-500/20 rounded-lg flex items-center justify-center">📊</div><span>数据分析 - 深度健康洞察</span></div>
                  <div class="flex items-center space-x-4"><div class="w-8 h-8 flex-shrink-0 bg-orange-500/20 rounded-lg flex items-center justify-center">🛒</div><span>健康商城 - 精选健康产品</span></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Slide 4: 开始体验 -->
          <section class="scroll-slide">
            <div class="h-full flex flex-col justify-end px-8 pb-32">
              <div class="text-center space-y-8">
                 <div class="text-8xl">🚀</div>
                <h2 class="text-4xl font-bold">准备好开启<br>您的健康之旅了吗？</h2>
                <p class="text-lg text-gray-300">
                  立即进入健康商城，发现更多精彩。
                </p>
                <button @click="startExperience" class="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-gray-200 transition-all text-lg active:scale-95">
                  开始体验
                </button>
              </div>
            </div>
          </section>
        </main>
        
        <!-- 分页指示器 -->
        <div class="absolute bottom-16 left-0 right-0 flex justify-center items-center space-x-2 z-30">
          <button v-for="i in 4" :key="i" @click="scrollToSlide(i - 1)"
               :class="['h-2 rounded-full transition-all duration-500 ease-out', activeSlide === i - 1 ? 'w-5 bg-white' : 'w-2 bg-white/40']">
          </button>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import PhoneFrame from '../components/PhoneFrame.vue'

const router = useRouter()
const scrollContainer = ref(null)
const activeSlide = ref(0)
let scrollTimeout = null

// 登录
const handleLogin = () => {
  router.push('/')
}

// 开始体验
const startExperience = () => {
  sessionStorage.setItem('tempLoginStatus', 'true')
  window.dispatchEvent(new Event('loginStatusChanged'))
  router.push('/home?show=mall')
}

const handleScroll = () => {
  if (!scrollContainer.value) return;
  // Debounce to avoid performance issues on rapid scroll
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const slideWidth = scrollContainer.value.clientWidth;
    const currentScroll = scrollContainer.value.scrollLeft;
    activeSlide.value = Math.round(currentScroll / slideWidth);
  }, 100);
}

const scrollToSlide = (index) => {
  if (scrollContainer.value) {
    const slideWidth = scrollContainer.value.clientWidth;
    scrollContainer.value.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
  clearTimeout(scrollTimeout)
})
</script>

<style scoped>
.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-slide {
  flex: 0 0 100%;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden; /* Prevent content overflow issues on slides */
}

/* 安全区域适配 */
.pb-safe-bottom {
  padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
}
</style> 