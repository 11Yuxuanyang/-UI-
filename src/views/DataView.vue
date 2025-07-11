<template>
  <div class="p-6 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">健康数据</h1>
      <div class="flex space-x-2">
        <button @click="selectedPeriod = 'day'" 
                :class="['px-3 py-1 rounded-full text-xs', selectedPeriod === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300']">
          今日
        </button>
        <button @click="selectedPeriod = 'week'" 
                :class="['px-3 py-1 rounded-full text-xs', selectedPeriod === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300']">
          本周
        </button>
        <button @click="selectedPeriod = 'month'" 
                :class="['px-3 py-1 rounded-full text-xs', selectedPeriod === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300']">
          本月
        </button>
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="glassmorphism-card rounded-2xl p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm">总步数</p>
            <p class="text-2xl font-bold text-green-400">{{ todaySteps.toLocaleString() }}</p>
            <p class="text-xs text-gray-500">目标: 10,000</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>
        <div class="mt-3 bg-gray-700 rounded-full h-2">
          <div class="bg-green-400 h-2 rounded-full" :style="{width: Math.min((todaySteps / 10000) * 100, 100) + '%'}"></div>
        </div>
      </div>

      <div class="glassmorphism-card rounded-2xl p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm">平均心率</p>
            <p class="text-2xl font-bold text-red-400">{{ heartRate }} <span class="text-sm">bpm</span></p>
            <p class="text-xs text-gray-500">静息: 62 bpm</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Charts Section -->
    <div class="space-y-4">
      <!-- Activity Chart -->
      <div class="glassmorphism-card rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">活动趋势</h3>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div class="grid grid-cols-7 gap-2 mb-3">
          <div v-for="(day, index) in weekData" :key="index" class="text-center">
            <div class="text-xs text-gray-400 mb-2">{{ day.label }}</div>
            <div class="bg-gray-700 rounded-lg h-16 flex items-end justify-center relative">
              <div :class="['rounded-lg transition-all duration-500', getActivityColor(day.activity)]" 
                   :style="{height: (day.activity / 100) * 100 + '%', width: '80%'}">
              </div>
              <div class="absolute bottom-1 text-xs text-white font-medium">{{ day.activity }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sleep Chart -->
      <div class="glassmorphism-card rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">睡眠质量</h3>
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </div>
        <div class="space-y-3">
          <div v-for="sleep in sleepData" :key="sleep.date" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 rounded-full" :class="getSleepQualityColor(sleep.quality)"></div>
              <span class="text-sm">{{ sleep.date }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium">{{ sleep.duration }}</div>
              <div class="text-xs text-gray-400">{{ sleep.quality }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Health Metrics -->
      <div class="glassmorphism-card rounded-2xl p-5">
        <h3 class="text-lg font-semibold mb-4">健康指标</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium">压力水平</p>
                <p class="text-xs text-gray-400">基于心率变异性</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-yellow-400">适中</p>
              <p class="text-xs text-gray-400">42/100</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium">体温</p>
                <p class="text-xs text-gray-400">皮肤温度</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-green-400">36.8°C</p>
              <p class="text-xs text-gray-400">正常</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium">血氧饱和度</p>
                <p class="text-xs text-gray-400">SpO2</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-green-400">98%</p>
              <p class="text-xs text-gray-400">优秀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('day')
const todaySteps = ref(8247)
const heartRate = ref(72)

const weekData = ref([
  { label: '周一', activity: 85 },
  { label: '周二', activity: 92 },
  { label: '周三', activity: 78 },
  { label: '周四', activity: 88 },
  { label: '周五', activity: 95 },
  { label: '周六', activity: 73 },
  { label: '周日', activity: 82 }
])

const sleepData = ref([
  { date: '昨晚', duration: '7小时32分', quality: '良好' },
  { date: '前晚', duration: '6小时18分', quality: '一般' },
  { date: '三天前', duration: '8小时45分', quality: '优秀' },
  { date: '四天前', duration: '7小时12分', quality: '良好' },
])

const getActivityColor = (activity) => {
  if (activity >= 90) return 'bg-green-500'
  if (activity >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getSleepQualityColor = (quality) => {
  if (quality === '优秀') return 'bg-green-500'
  if (quality === '良好') return 'bg-yellow-500'
  return 'bg-red-500'
}
</script> 