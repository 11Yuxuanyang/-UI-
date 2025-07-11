<template>
  <div class="text-white min-h-screen pb-24">
    <!-- Header -->
    <div class="px-6 pt-6 pb-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold mb-1">设置</h1>
          <p class="text-sm text-gray-400">个人偏好与账户管理</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-gray-800/60 flex items-center justify-center">
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 用户信息卡片 -->
    <div class="px-6 mb-6">
      <div class="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-white mb-1">{{ userProfile.name }}</h3>
            <p class="text-sm text-gray-400 mb-2">{{ userProfile.email }}</p>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">活跃用户</span>
              <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">会员</span>
            </div>
          </div>
          <button class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 设置选项 -->
    <div class="px-6 space-y-4">
      <!-- 设备管理 -->
      <div class="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div class="p-4 border-b border-gray-700/50">
          <h4 class="text-sm font-medium text-gray-300 uppercase tracking-wide">设备管理</h4>
        </div>
        <div class="divide-y divide-gray-700/50">
          <div v-for="device in deviceSettings" :key="device.id" 
               class="p-4 hover:bg-gray-700/20 transition-colors cursor-pointer">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', device.bgColor]">
                  <svg class="w-5 h-5" :class="device.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="device.icon"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-white">{{ device.name }}</p>
                  <p class="text-xs text-gray-400">{{ device.description }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span v-if="device.status" 
                      :class="[
                        'w-2 h-2 rounded-full',
                        device.status === 'connected' ? 'bg-green-400' : 'bg-gray-400'
                      ]"></span>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 通知设置 -->
      <div class="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div class="p-4 border-b border-gray-700/50">
          <h4 class="text-sm font-medium text-gray-300 uppercase tracking-wide">通知设置</h4>
        </div>
        <div class="divide-y divide-gray-700/50">
          <div v-for="notification in notificationSettings" :key="notification.id" 
               class="p-4 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', notification.bgColor]">
                <svg class="w-5 h-5" :class="notification.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="notification.icon"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-white">{{ notification.name }}</p>
                <p class="text-xs text-gray-400">{{ notification.description }}</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="notification.enabled" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- 应用设置 -->
      <div class="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div class="p-4 border-b border-gray-700/50">
          <h4 class="text-sm font-medium text-gray-300 uppercase tracking-wide">应用设置</h4>
        </div>
        <div class="divide-y divide-gray-700/50">
          <router-link 
            to="/records"
            class="block p-4 hover:bg-gray-700/20 transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/20">
                  <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-white">历史记录</p>
                  <p class="text-xs text-gray-400">查看对话记录和健康报告</p>
                </div>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </router-link>
          <div v-for="setting in appSettings" :key="setting.id" 
               class="p-4 hover:bg-gray-700/20 transition-colors cursor-pointer">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', setting.bgColor]">
                  <svg class="w-5 h-5" :class="setting.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="setting.icon"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-white">{{ setting.name }}</p>
                  <p class="text-xs text-gray-400">{{ setting.description }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span v-if="setting.value" class="text-xs text-gray-400">{{ setting.value }}</span>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 账户操作 -->
      <div class="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div class="p-4 border-b border-gray-700/50">
          <h4 class="text-sm font-medium text-gray-300 uppercase tracking-wide">账户</h4>
        </div>
        <div class="divide-y divide-gray-700/50">
          <div v-for="action in accountActions" :key="action.id" 
               @click="handleAccountAction(action.id)"
               class="p-4 hover:bg-gray-700/20 transition-colors cursor-pointer">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', action.bgColor]">
                  <svg class="w-5 h-5" :class="action.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium" :class="action.textColor">{{ action.name }}</p>
                  <p class="text-xs text-gray-400">{{ action.description }}</p>
                </div>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 版本信息 -->
    <div class="px-6 mt-8 mb-4">
      <div class="text-center">
        <p class="text-xs text-gray-500 mb-1">HealthWatch v1.0.0</p>
        <p class="text-xs text-gray-500">© 2024 HealthTech. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 用户信息
const userProfile = ref({
  name: '健康用户',
  email: 'user@healthwatch.com'
})

// 设备设置
const deviceSettings = ref([
  {
    id: 1,
    name: 'HealthWatch Pro',
    description: '已连接 · 电量 78%',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    bgColor: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    status: 'connected'
  },
  {
    id: 2,
    name: '蓝牙连接',
    description: '管理设备连接',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    bgColor: 'bg-green-500/20',
    iconColor: 'text-green-400',
    status: 'connected'
  }
])

// 通知设置
const notificationSettings = ref([
  {
    id: 1,
    name: '健康提醒',
    description: '运动、喝水、休息提醒',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    bgColor: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
    enabled: true
  },
  {
    id: 2,
    name: '数据同步',
    description: '自动同步健康数据',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    bgColor: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    enabled: true
  },
  {
    id: 3,
    name: '消息推送',
    description: '应用消息和更新通知',
    icon: 'M15 17h5l-5 5v-5zM10.5 21h5v-5l-5 5zm0 0H7a3 3 0 01-3-3v-8a3 3 0 013-3h8a3 3 0 013 3v2',
    bgColor: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    enabled: false
  }
])

// 应用设置
const appSettings = ref([
  {
    id: 1,
    name: '主题设置',
    description: '外观和显示偏好',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    bgColor: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400',
    value: '深色'
  },
  {
    id: 2,
    name: '语言',
    description: '更改应用显示语言',
    icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    bgColor: 'bg-green-500/20',
    iconColor: 'text-green-400',
    value: '中文'
  },
  {
    id: 3,
    name: '数据导出',
    description: '导出健康数据报告',
    icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    bgColor: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400'
  },
  {
    id: 4,
    name: '隐私设置',
    description: '数据隐私和权限管理',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    bgColor: 'bg-red-500/20',
    iconColor: 'text-red-400'
  }
])

// 账户操作
const accountActions = ref([
  {
    id: 1,
    name: '帮助中心',
    description: '使用帮助和常见问题',
    icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    bgColor: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    textColor: 'text-white'
  },
  {
    id: 2,
    name: '意见反馈',
    description: '向我们提出建议',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    bgColor: 'bg-green-500/20',
    iconColor: 'text-green-400',
    textColor: 'text-white'
  },
  {
    id: 3,
    name: '关于我们',
    description: '了解更多关于 HealthWatch',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    bgColor: 'bg-gray-500/20',
    iconColor: 'text-gray-400',
    textColor: 'text-white'
  },
  {
    id: 4,
    name: '退出登录',
    description: '安全退出当前账户',
    icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
    bgColor: 'bg-red-500/20',
    iconColor: 'text-red-400',
    textColor: 'text-red-400'
  }
])

// 处理账户操作
const handleAccountAction = (actionId) => {
  if (actionId === 4) { // 退出登录
    if (confirm('确定要退出登录吗？')) {
      // 清除登录状态
      sessionStorage.removeItem('tempLoginStatus')
      
      // 触发状态更新事件
      window.dispatchEvent(new Event('loginStatusChanged'))
      
      // 跳转到登录页面
      router.push('/')
    }
  } else {
    // 其他操作的处理逻辑
    console.log('账户操作:', actionId)
  }
}
</script>

<style scoped>
/* 开关按钮样式 */
input[type="checkbox"]:checked + div {
  background-color: #3B82F6;
}

input[type="checkbox"]:checked + div::after {
  transform: translateX(100%);
}

/* 悬停效果 */
.hover\:bg-gray-700\/20:hover {
  background-color: rgba(55, 65, 81, 0.2);
}

/* 平滑过渡效果 */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style> 