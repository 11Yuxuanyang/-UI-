<template>
  <div class="p-6 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold">我的日程</h1>
      <button class="p-2 rounded-full hover:bg-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>

    <!-- Date Selector -->
    <div class="flex justify-between items-center mb-6">
      <button class="p-2 rounded-full hover:bg-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div class="text-center">
        <h2 class="text-lg font-semibold">{{ selectedDate.day }}</h2>
        <p class="text-sm text-gray-400">{{ selectedDate.month }}</p>
      </div>
      <button class="p-2 rounded-full hover:bg-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Schedule Items -->
    <div class="space-y-4">
      <div v-for="item in scheduleItems" :key="item.id" class="flex items-start space-x-4">
        <div class="flex flex-col items-center">
          <span class="text-sm text-gray-400">{{ item.time.split(' ')[0] }}</span>
          <span class="text-xs text-gray-500">{{ item.time.split(' ')[1] }}</span>
        </div>
        <div class="flex-1 glassmorphism-card rounded-xl p-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-white">{{ item.title }}</h3>
              <p v-if="item.description" class="text-sm text-gray-300 mt-1">{{ item.description }}</p>
            </div>
            <div class="w-4 h-4 rounded-full mt-1" :class="item.completed ? 'bg-green-500' : 'border-2 border-gray-500'"></div>
          </div>
          <div v-if="item.tags" class="mt-3 flex flex-wrap gap-2">
            <span v-for="tag in item.tags" :key="tag" 
                  :class="getTagColor(tag)"
                  class="px-2 py-1 text-xs rounded-full">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add new task FAB -->
    <button class="fixed bottom-24 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedDate = ref({ day: '今天, 28', month: '十月' });

const scheduleItems = ref([
  { id: 1, time: '08:00 AM', title: '晨间慢跑', description: '公园慢跑 3 公里', tags: ['运动', '户外'], completed: true },
  { id: 2, time: '09:00 AM', title: '健康早餐', description: '燕麦、鸡蛋和一杯牛奶', tags: ['饮食'], completed: true },
  { id: 3, time: '12:30 PM', title: '午餐', description: '鸡胸肉沙拉和全麦面包', tags: ['饮食'], completed: false },
  { id: 4, time: '03:00 PM', title: '正念冥想', description: '10分钟呼吸练习', tags: ['放松', '心理健康'], completed: false },
  { id: 5, time: '06:00 PM', title: '力量训练', description: '健身房', tags: ['运动', '健身房'], completed: false },
  { id: 6, time: '09:00 PM', title: '阅读', description: '睡前阅读 30 分钟', tags: ['放松'], completed: false },
]);

const getTagColor = (tag) => {
  switch (tag) {
    case '运动': return 'bg-green-500/20 text-green-400';
    case '饮食': return 'bg-blue-500/20 text-blue-400';
    case '放松': return 'bg-purple-500/20 text-purple-400';
    case '心理健康': return 'bg-yellow-500/20 text-yellow-400';
    case '健身房': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-300';
  }
};
</script>

<style scoped>
.glassmorphism-card {
  background: rgba(41, 41, 50, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style> 