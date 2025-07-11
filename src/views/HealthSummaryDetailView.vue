<template>
  <div class="p-6 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <router-link to="/home" class="p-2 -m-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>
      <h1 class="text-xl font-bold">健康记录</h1>
      <div class="flex space-x-2">
        <button @click="activeTab = 'conversations'" 
                :class="['px-4 py-2 rounded-full text-sm', activeTab === 'conversations' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300']">
          对话记录
        </button>
        <button @click="activeTab = 'summaries'" 
                :class="['px-4 py-2 rounded-full text-sm', activeTab === 'summaries' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300']">
          AI 总结
        </button>
      </div>
    </div>

    <!-- Conversations Tab -->
    <div v-if="activeTab === 'conversations'" class="space-y-4">
      <div class="glassmorphism-card rounded-2xl p-1">
        <div class="bg-black/20 rounded-xl p-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-blue-400">今日对话</h3>
            <span class="text-xs text-gray-400">{{ new Date().toLocaleDateString() }}</span>
          </div>
          
          <!-- Chat Messages -->
          <div class="space-y-3 max-h-64 overflow-y-auto">
            <div v-for="message in todayConversations" :key="message.id" 
                 :class="['flex', message.isUser ? 'justify-end' : 'justify-start']">
              <div :class="['max-w-xs rounded-2xl px-4 py-2 text-sm', 
                           message.isUser ? 'bg-blue-500 text-white ml-12' : 'bg-gray-700 text-gray-100 mr-12']">
                <p>{{ message.text }}</p>
                <span class="text-xs opacity-70 block mt-1">{{ message.time }}</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 pt-3 border-t border-gray-600">
            <button class="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              查看完整对话 →
            </button>
          </div>
        </div>
      </div>

      <!-- Previous Conversations -->
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-300 mb-3">历史对话</h3>
        <div v-for="conversation in previousConversations" :key="conversation.id" 
             class="glassmorphism-card rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-colors">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <span class="text-sm font-medium">{{ conversation.title }}</span>
              </div>
              <p class="text-xs text-gray-400 mb-2">{{ conversation.summary }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">{{ conversation.date }}</span>
                <span class="text-xs text-gray-500">{{ conversation.messageCount }} 条消息</span>
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Summaries Tab -->
    <div v-if="activeTab === 'summaries'" class="space-y-4">
      <!-- Today's Summary -->
      <div class="glassmorphism-card rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-blue-400">今日健康总结</h3>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-400">实时更新</span>
          </div>
        </div>
        
        <div class="bg-black/20 rounded-xl p-4 mb-4">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
              <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-200 leading-relaxed">
                今天您的整体健康状况良好。步数达到了8,247步，接近每日目标。心率在正常范围内，平均72 bpm。
                建议您保持当前的运动习惯，注意晚餐后的消化时间，有助于提升睡眠质量。
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">运动良好</span>
                <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">心率正常</span>
                <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">注意睡眠</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="bg-black/10 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-green-400">85%</div>
            <div class="text-xs text-gray-400">活动完成度</div>
          </div>
          <div class="bg-black/10 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-blue-400">7.5h</div>
            <div class="text-xs text-gray-400">预估睡眠</div>
          </div>
          <div class="bg-black/10 rounded-lg p-3 text-center">
            <div class="text-lg font-bold text-purple-400">良好</div>
            <div class="text-xs text-gray-400">整体状态</div>
          </div>
        </div>
      </div>

      <!-- Weekly Summary -->
      <div class="glassmorphism-card rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">本周总结</h3>
          <span class="text-xs text-gray-400">{{ getWeekRange() }}</span>
        </div>
        
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium">运动目标完成</p>
              <p class="text-xs text-gray-400">本周5天达到步数目标，表现优秀</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium">睡眠质量波动</p>
              <p class="text-xs text-gray-400">周三和周六睡眠时间偏短，建议调整作息</p>
            </div>
          </div>
          
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium">压力管理</p>
              <p class="text-xs text-gray-400">整体压力水平适中，建议继续保持</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Historical Summaries -->
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-300">历史总结</h3>
        <div v-for="summary in historicalSummaries" :key="summary.id" 
             class="glassmorphism-card rounded-xl p-4 cursor-pointer hover:bg-white/5 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <span class="font-medium text-sm">{{ summary.title }}</span>
            <span class="text-xs text-gray-400">{{ summary.date }}</span>
          </div>
          <p class="text-xs text-gray-400 mb-3">{{ summary.summary }}</p>
          <div class="flex items-center justify-between">
            <div class="flex space-x-2">
              <span v-for="tag in summary.tags" :key="tag" 
                    class="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                {{ tag }}
              </span>
            </div>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('summaries')

const todayConversations = ref([
  { id: 1, text: "我今天感觉有点累", isUser: true, time: "14:30" },
  { id: 2, text: "收到。建议您适当休息，补充水分。需要为您播放一些舒缓的音乐吗？", isUser: false, time: "14:31" },
  { id: 3, text: "好的，谢谢", isUser: true, time: "14:31" },
])

const previousConversations = ref([
  { id: 1, title: "关于跑步后的拉伸", summary: "询问了关于跑步后如何正确拉伸以避免肌肉酸痛的问题...", date: "2023-10-25", messageCount: 8 },
  { id: 2, title: "关于昨晚的睡眠质量", summary: "反馈昨晚睡眠不佳，AI给出了一些改善睡眠的建议...", date: "2023-10-24", messageCount: 12 },
])

const historicalSummaries = ref([
  { id: 1, title: '2023年10月25日 健康报告', date: '2023-10-25', summary: '整体健康状况良好，运动和心率指标均达标。', tags: ['运动达标', '心率正常'] },
  { id: 2, title: '2023年10月24日 健康报告', date: '2023-10-24', summary: '睡眠质量有待提高，建议调整作息。', tags: ['睡眠不足', '压力适中'] },
  { id: 3, title: '2023年10月23日 健康报告', date: '2023-10-23', summary: '活动量未达标，但其他指标正常。', tags: ['活动不足', '饮食均衡'] },
])

const getWeekRange = () => {
  const start = new Date()
  start.setDate(start.getDate() - start.getDay() + 1)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return `${start.toLocaleDateString('zh-CN', {month: 'short', day: 'numeric'})} - ${end.toLocaleDateString('zh-CN', {month: 'short', day: 'numeric'})}`
}
</script>

<style scoped>
.glassmorphism-card {
  background: rgba(41, 41, 50, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Custom scrollbar for better look in dark mode */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(107, 114, 128, 0.5);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}
</style> 