<template>
  <div class="text-white min-h-screen">
    <!-- Header -->
    <div class="px-6 pt-6 pb-4">
      <!-- Header Title -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold">我的积分</h1>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <!-- Points Card -->
        <div class="bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-blue-400/10 rounded-2xl p-5 backdrop-blur-sm border border-blue-500/20">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
            </div>
            <div class="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">积分</div>
          </div>
          <div class="text-2xl font-bold text-white mb-1">{{ totalPoints }}</div>
          <div class="text-xs text-blue-200">总积分数量</div>
        </div>

        <!-- Collections Card -->
        <div 
          class="bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-purple-400/10 rounded-2xl p-5 backdrop-blur-sm border border-purple-500/20 cursor-pointer transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-600/20"
          @click="$router.push('/collections')"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <div class="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">藏品</div>
          </div>
          <div class="text-2xl font-bold text-white mb-1">{{ collectionsCount }}</div>
          <div class="text-xs text-purple-200">NFT收藏品</div>
        </div>
      </div>

      <!-- Points Overview Card -->
      <div class="bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-pink-600/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-lg font-semibold mb-1">本周积分</h2>
            <div class="text-3xl font-bold text-white">+{{ weeklyPoints }}</div>
          </div>
          <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>
        <div class="flex items-center space-x-4 text-sm">
          <span class="text-white/80">距离下一等级还需 <span class="font-semibold text-white">{{ pointsToNextLevel }}</span> 积分</span>
        </div>
        <div class="mt-3 bg-white/10 rounded-full h-2">
          <div class="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" :style="{ width: levelProgress + '%' }"></div>
        </div>
      </div>




    </div>

    <!-- Tabs -->
    <div class="px-6 mb-6">
      <div class="flex space-x-1 bg-gray-800/40 rounded-2xl p-1">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300',
            activeTab === tab.id 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'text-gray-300 hover:text-white'
          ]"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="px-6">
      <!-- Achievements Tab -->
      <div v-if="activeTab === 'achievements'">
        <h3 class="text-lg font-semibold mb-4">成就徽章</h3>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.id"
            :class="[
              'bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border transition-all duration-300',
              achievement.unlocked 
                ? 'border-yellow-500/50 bg-yellow-500/10' 
                : 'border-gray-700/50 hover:border-gray-600/50'
            ]"
          >
            <div class="text-center">
              <div :class="[
                'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3',
                achievement.unlocked ? 'bg-yellow-500/20' : 'bg-gray-700/30'
              ]">
                <svg :class="[
                  'w-8 h-8',
                  achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="achievement.icon"/>
                </svg>
              </div>
              <h4 :class="[
                'font-medium text-sm mb-1',
                achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
              ]">{{ achievement.name }}</h4>
              <p class="text-xs text-gray-500 mb-2">{{ achievement.description }}</p>
              <div v-if="achievement.unlocked" class="text-xs text-yellow-400 font-medium">
                +{{ achievement.points }} 积分
              </div>
              <div v-else class="text-xs text-gray-500">
                {{ achievement.progress }}/{{ achievement.target }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tasks Tab -->
      <div v-if="activeTab === 'tasks'">
        <h3 class="text-lg font-semibold mb-4">每日任务</h3>
        <div class="space-y-4 mb-6">
          <div 
            v-for="task in dailyTasks" 
            :key="task.id"
            class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  task.completed ? 'bg-green-500/20' : 'bg-blue-500/20'
                ]">
                  <svg :class="[
                    'w-5 h-5',
                    task.completed ? 'text-green-400' : 'text-blue-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="task.icon"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-white text-sm">{{ task.name }}</h4>
                  <p class="text-xs text-gray-400">{{ task.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <div v-if="task.completed" class="text-green-400 text-sm font-medium">已完成</div>
                <div v-else class="text-blue-400 text-sm font-medium">+{{ task.points }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ task.progress }}/{{ task.target }}</div>
              </div>
            </div>
            <div v-if="!task.completed" class="mt-3 bg-gray-700/30 rounded-full h-2">
              <div class="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" 
                   :style="{ width: (task.progress / task.target * 100) + '%' }"></div>
            </div>
          </div>
        </div>

        <h3 class="text-lg font-semibold mb-4">周任务</h3>
        <div class="space-y-4">
          <div 
            v-for="task in weeklyTasks" 
            :key="task.id"
            class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  task.completed ? 'bg-green-500/20' : 'bg-purple-500/20'
                ]">
                  <svg :class="[
                    'w-5 h-5',
                    task.completed ? 'text-green-400' : 'text-purple-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="task.icon"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-white text-sm">{{ task.name }}</h4>
                  <p class="text-xs text-gray-400">{{ task.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <div v-if="task.completed" class="text-green-400 text-sm font-medium">已完成</div>
                <div v-else class="text-purple-400 text-sm font-medium">+{{ task.points }}</div>
                <div class="text-xs text-gray-500 mt-1">{{ task.progress }}/{{ task.target }}</div>
              </div>
            </div>
            <div v-if="!task.completed" class="mt-3 bg-gray-700/30 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" 
                   :style="{ width: (task.progress / task.target * 100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Exchange Tab -->
      <div v-if="activeTab === 'exchange'">
        <h3 class="text-lg font-semibold mb-4">积分兑换</h3>
        
        <!-- Mall Link -->
        <div class="mb-6">
          <div 
            @click="$router.push('/mall')"
            class="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl p-4 border border-blue-500/30 cursor-pointer hover:border-blue-400/50 transition-all duration-300"
          >
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-white mb-1">🛍️ 前往商城购物</h4>
                <p class="text-xs text-gray-300 mb-2">探索更多健康产品和智能设备</p>
                <div class="flex items-center justify-between">
                  <span class="text-blue-400 font-medium text-sm">立即前往</span>
                  <div class="flex items-center space-x-1 text-blue-400">
                    <span class="text-xs">查看全部商品</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 gap-4">
          <div 
            v-for="reward in rewards" 
            :key="reward.id"
            class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
          >
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="reward.icon"/>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-white mb-1">{{ reward.name }}</h4>
                <p class="text-xs text-gray-400 mb-2">{{ reward.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-blue-400 font-medium">{{ reward.points }} 积分</span>
                  <button 
                    :disabled="totalPoints < reward.points"
                    :class="[
                      'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                      totalPoints >= reward.points 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    ]"
                  >
                    {{ totalPoints >= reward.points ? '兑换' : '积分不足' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- History Tab -->
      <div v-if="activeTab === 'history'">
        <h3 class="text-lg font-semibold mb-4">积分历史</h3>
        <div class="space-y-3">
          <div 
            v-for="record in pointsHistory" 
            :key="record.id"
            class="bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="[
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  record.type === 'earned' ? 'bg-green-500/20' : 'bg-red-500/20'
                ]">
                  <svg :class="[
                    'w-4 h-4',
                    record.type === 'earned' ? 'text-green-400' : 'text-red-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          :d="record.type === 'earned' ? 'M12 6v12m6-6H6' : 'M6 12h12'"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-white text-sm">{{ record.description }}</h4>
                  <p class="text-xs text-gray-400">{{ record.date }}</p>
                </div>
              </div>
              <div :class="[
                'font-bold text-sm',
                record.type === 'earned' ? 'text-green-400' : 'text-red-400'
              ]">
                {{ record.type === 'earned' ? '+' : '-' }}{{ record.points }}
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <!-- Bottom Spacing -->
    <div class="h-24"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('achievements')
const totalPoints = ref(2847)
const collectionsCount = ref(6)
const weeklyPoints = ref(324)
const pointsToNextLevel = ref(153)
const levelProgress = ref(75)

const tabs = ref([
  { id: 'achievements', name: '成就' },
  { id: 'tasks', name: '任务' },
  { id: 'exchange', name: '兑换' },
  { id: 'history', name: '历史' }
])

const achievements = ref([
  {
    id: 1,
    name: '早起之星',
    description: '连续7天早起',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    points: 100,
    unlocked: true,
    progress: 7,
    target: 7
  },
  {
    id: 2,
    name: '步行达人',
    description: '单日步数超过10000',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    points: 50,
    unlocked: true,
    progress: 1,
    target: 1
  },
  {
    id: 3,
    name: '健康饮食',
    description: '连续记录饮食30天',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    points: 200,
    unlocked: false,
    progress: 18,
    target: 30
  },
  {
    id: 4,
    name: '睡眠大师',
    description: '连续7天优质睡眠',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    points: 150,
    unlocked: false,
    progress: 4,
    target: 7
  }
])

const dailyTasks = ref([
  {
    id: 1,
    name: '步数目标',
    description: '完成8000步',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    points: 20,
    completed: true,
    progress: 8247,
    target: 8000
  },
  {
    id: 2,
    name: '喝水提醒',
    description: '喝8杯水',
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    points: 15,
    completed: false,
    progress: 5,
    target: 8
  },
  {
    id: 3,
    name: '运动时长',
    description: '运动30分钟',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    points: 25,
    completed: false,
    progress: 15,
    target: 30
  }
])

const weeklyTasks = ref([
  {
    id: 1,
    name: '周运动目标',
    description: '本周运动5次',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    points: 100,
    completed: false,
    progress: 3,
    target: 5
  },
  {
    id: 2,
    name: '体重记录',
    description: '记录体重7次',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    points: 80,
    completed: true,
    progress: 7,
    target: 7
  }
])

const rewards = ref([
  {
    id: 1,
    name: '7天会员',
    description: '解锁高级功能7天',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    points: 500
  },
  {
    id: 2,
    name: '健康报告',
    description: 'AI生成专业健康分析报告',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    points: 800
  },
  {
    id: 3,
    name: '个人训练计划',
    description: '定制化运动计划',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    points: 1200
  },
  {
    id: 4,
    name: '营养师咨询',
    description: '专业营养师一对一咨询',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    points: 2000
  }
])

const pointsHistory = ref([
  {
    id: 1,
    description: '完成每日步数目标',
    points: 20,
    type: 'earned',
    date: '今天 14:30'
  },
  {
    id: 2,
    description: '解锁早起之星成就',
    points: 100,
    type: 'earned',
    date: '今天 07:00'
  },
  {
    id: 3,
    description: '兑换健康报告',
    points: 800,
    type: 'spent',
    date: '昨天 16:20'
  },
  {
    id: 4,
    description: '完成周运动目标',
    points: 100,
    type: 'earned',
    date: '2天前 19:45'
  }
])

const nftCollections = ref([
  {
    id: 1,
    name: '健康勇士',
    description: '象征着坚持不懈和健康生活方式的NFT',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    rarity: 'rare',
    rarityText: '稀有',
    value: 500,
    obtainedDate: '2023-10-25',
    specialEffect: '提升健康积分获取速度'
  },
  {
    id: 2,
    name: '活力小子',
    description: '代表活力和积极生活的NFT',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    rarity: 'epic',
    rarityText: '史诗',
    value: 1200,
    obtainedDate: '2023-10-26',
    specialEffect: '增加每日步数奖励'
  },
  {
    id: 3,
    name: '健康小卫士',
    description: '守护健康和快乐的NFT',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    rarity: 'legendary',
    rarityText: '传说',
    value: 2000,
    obtainedDate: '2023-10-27',
    specialEffect: '解锁所有成就'
  },
  {
    id: 4,
    name: '健康小精灵',
    description: '带来好运和健康的NFT',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    rarity: 'common',
    rarityText: '普通',
    value: 100,
    obtainedDate: '2023-10-28',
    specialEffect: null
  }
])
</script>

<style scoped>
.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 0.3s ease;
}

.search-slide-enter-from,
.search-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 商品卡片悬停效果 */
.group:hover .transform {
  transform: translateY(-2px);
}

/* 平滑滚动 */
.overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style> 