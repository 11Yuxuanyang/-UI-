<template>
  <div class="text-white min-h-screen pb-20">
    <!-- Header -->
    <div class="px-6 pt-6 pb-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">我的日程</h1>
        <button class="w-10 h-10 bg-gray-800/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
      </div>

      <!-- Date Navigation -->
      <div class="flex items-center justify-between mb-6">
        <button @click="previousMonth" class="w-10 h-10 bg-gray-800/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50">
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div class="text-center">
          <div class="text-xl font-bold">今天, {{ currentDay }}</div>
          <div class="text-sm text-gray-400">{{ currentMonthName }}</div>
        </div>
        
        <button @click="nextMonth" class="w-10 h-10 bg-gray-800/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50">
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Calendar -->
    <div class="px-6">
      <!-- Calendar Card -->
      <div class="bg-gray-800/40 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 mb-6">
        <!-- Week Days Header -->
        <div class="grid grid-cols-7 gap-1 mb-4">
          <div v-for="day in weekDays" :key="day" class="text-center text-xs text-gray-400 font-medium py-2">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          <div 
            v-for="date in calendarDays" 
            :key="date.key"
            :class="[
              'aspect-square flex items-center justify-center text-sm rounded-xl transition-all duration-200 cursor-pointer',
              date.isCurrentMonth ? 'text-white hover:bg-gray-700/50' : 'text-gray-600',
              date.isToday ? 'bg-blue-500 text-white font-bold' : '',
              date.hasEvent ? 'relative' : '',
              selectedDate === date.day && date.isCurrentMonth ? 'bg-gray-700/70 ring-2 ring-blue-400/50' : ''
            ]"
            @click="selectDate(date)"
          >
            {{ date.day }}
            <!-- Event Indicator -->
            <div v-if="date.hasEvent && !date.isToday" class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <!-- Today's Schedule -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">今日日程</h3>
          <span class="text-sm text-gray-400">{{ formatSelectedDate() }}</span>
        </div>
        
        <div class="space-y-3">
          <div v-if="todayEvents.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-gray-800/40 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-1">今日暂无日程</h4>
            <p class="text-sm text-gray-400">点击右上角"+"添加新的日程安排</p>
          </div>

          <div 
            v-for="event in todayEvents" 
            :key="event.id"
            class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
          >
            <div class="flex items-start space-x-3">
              <div :class="[
                'w-3 h-3 rounded-full mt-2 flex-shrink-0',
                event.type === 'health' ? 'bg-green-400' : '',
                event.type === 'exercise' ? 'bg-blue-400' : '',
                event.type === 'meal' ? 'bg-orange-400' : '',
                event.type === 'sleep' ? 'bg-purple-400' : '',
                event.type === 'other' ? 'bg-gray-400' : ''
              ]"></div>
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <h4 class="font-medium text-white text-sm">{{ event.title }}</h4>
                  <span class="text-xs text-gray-400">{{ event.time }}</span>
                </div>
                <p class="text-xs text-gray-400 mb-2">{{ event.description }}</p>
                <div class="flex items-center space-x-2">
                  <span :class="[
                    'px-2 py-1 rounded-lg text-xs',
                    event.type === 'health' ? 'bg-green-500/20 text-green-400' : '',
                    event.type === 'exercise' ? 'bg-blue-500/20 text-blue-400' : '',
                    event.type === 'meal' ? 'bg-orange-500/20 text-orange-400' : '',
                    event.type === 'sleep' ? 'bg-purple-500/20 text-purple-400' : '',
                    event.type === 'other' ? 'bg-gray-500/20 text-gray-400' : ''
                  ]">
                    {{ getEventTypeName(event.type) }}
                  </span>
                  <span v-if="event.reminder" class="text-xs text-gray-500">
                    <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM12 17V7a5 5 0 110 10z"/>
                    </svg>
                    {{ event.reminder }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-4">即将到来</h3>
        <div class="space-y-3">
          <div 
            v-for="event in upcomingEvents" 
            :key="event.id"
            class="bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="[
                  'w-2 h-2 rounded-full',
                  event.type === 'health' ? 'bg-green-400' : '',
                  event.type === 'exercise' ? 'bg-blue-400' : '',
                  event.type === 'meal' ? 'bg-orange-400' : '',
                  event.type === 'sleep' ? 'bg-purple-400' : '',
                  event.type === 'other' ? 'bg-gray-400' : ''
                ]"></div>
                <div>
                  <h4 class="font-medium text-white text-sm">{{ event.title }}</h4>
                  <p class="text-xs text-gray-400">{{ event.date }} • {{ event.time }}</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 当前日期状态
const currentDate = ref(new Date())
const selectedDate = ref(new Date().getDate())

// 周几标识
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 月份名称
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

// 当前显示的日期信息
const currentDay = computed(() => {
  return new Date().getDate()
})

const currentMonthName = computed(() => {
  return monthNames[currentDate.value.getMonth()]
})

// 生成日历天数
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // 当月第一天是周几
  const firstDay = new Date(year, month, 1).getDay()
  // 当月有多少天
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // 上月有多少天
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  
  const days = []
  
  // 添加上月的日期（填充）
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false,
      key: `prev-${daysInPrevMonth - i}`
    })
  }
  
  // 添加当月的日期
  const today = new Date()
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = year === today.getFullYear() && 
                    month === today.getMonth() && 
                    day === today.getDate()
    
    days.push({
      day,
      isCurrentMonth: true,
      isToday,
      hasEvent: hasEventOnDate(day),
      key: `current-${day}`
    })
  }
  
  // 添加下月的日期（填充到42个格子）
  const remainingCells = 42 - days.length
  for (let day = 1; day <= remainingCells; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false,
      key: `next-${day}`
    })
  }
  
  return days
})

// 检查某日期是否有事件
const hasEventOnDate = (day) => {
  return sampleEvents.value.some(event => {
    const eventDate = new Date(event.date)
    return eventDate.getDate() === day && 
           eventDate.getMonth() === currentDate.value.getMonth() &&
           eventDate.getFullYear() === currentDate.value.getFullYear()
  })
}

// 示例事件数据
const sampleEvents = ref([
  {
    id: 1,
    title: '晨跑',
    description: '公园晨跑30分钟',
    date: new Date().toISOString().split('T')[0],
    time: '07:00',
    type: 'exercise',
    reminder: '提前15分钟'
  },
  {
    id: 2,
    title: '健康检查',
    description: '定期体检预约',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    type: 'health',
    reminder: '提前1小时'
  },
  {
    id: 3,
    title: '瑜伽课程',
    description: '线上瑜伽课',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // 明天
    time: '19:00',
    type: 'exercise',
    reminder: '提前30分钟'
  },
  {
    id: 4,
    title: '营养师咨询',
    description: '制定饮食计划',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // 后天
    time: '10:00',
    type: 'meal',
    reminder: '提前1小时'
  }
])

// 今日事件
const todayEvents = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return sampleEvents.value.filter(event => event.date === today)
})

// 即将到来的事件
const upcomingEvents = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return sampleEvents.value
    .filter(event => event.date > today)
    .slice(0, 3)
    .map(event => ({
      ...event,
      date: formatEventDate(event.date)
    }))
})

// 月份导航
const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

// 选择日期
const selectDate = (date) => {
  if (date.isCurrentMonth) {
    selectedDate.value = date.day
  }
}

// 格式化选中日期
const formatSelectedDate = () => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth() + 1
  return `${year}年${month}月${selectedDate.value}日`
}

// 格式化事件日期
const formatEventDate = (dateString) => {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

// 获取事件类型名称
const getEventTypeName = (type) => {
  const typeNames = {
    health: '健康',
    exercise: '运动',
    meal: '饮食',
    sleep: '睡眠',
    other: '其他'
  }
  return typeNames[type] || '其他'
}

onMounted(() => {
  selectedDate.value = new Date().getDate()
})
</script>

<style scoped>
/* 确保日历网格布局正确 */
.grid-cols-7 > * {
  min-height: 40px;
}
</style> 