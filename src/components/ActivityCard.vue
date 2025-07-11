<template>
  <div class="glassmorphism-card rounded-2xl p-4 text-white">
    <div class="flex justify-between">
      <!-- Activity Rings -->
      <div class="flex items-center space-x-4">
        <div class="relative w-28 h-28">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <!-- Backgrounds -->
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff453a" stroke-width="8" stroke-opacity="0.2"></circle>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#32ade6" stroke-width="8" stroke-opacity="0.2"></circle>
            <circle cx="50" cy="50" r="25" fill="none" stroke="#0a84ff" stroke-width="8" stroke-opacity="0.2"></circle>
            
            <!-- Progress Rings -->
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff453a" stroke-width="8" stroke-dasharray="282.74" :stroke-dashoffset="282.74 * (1 - 0.75)" transform="rotate(-90 50 50)"></circle>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#32ade6" stroke-width="8" stroke-dasharray="219.91" :stroke-dashoffset="219.91 * (1 - 0.6)" transform="rotate(-90 50 50)"></circle>
            <circle cx="50" cy="50" r="25" fill="none" stroke="#0a84ff" stroke-width="8" stroke-dasharray="157.08" :stroke-dashoffset="157.08 * (1 - 0.9)" transform="rotate(-90 50 50)"></circle>
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-400">活动 <span class="text-red-500 ml-1">--/-- <span class="text-xs">kcal</span></span></p>
          <p class="text-sm text-gray-400 mt-1">锻炼 <span class="text-cyan-400 ml-1">--/-- <span class="text-xs">分钟</span></span></p>
          <p class="text-sm text-gray-400 mt-1">站立 <span class="text-blue-500 ml-1">--/-- <span class="text-xs">小时</span></span></p>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="text-right">
        <div>
          <p class="text-sm text-gray-400">步数</p>
          <p class="text-2xl font-semibold">2296 <span class="text-sm font-normal">步</span></p>
        </div>
        <div class="mt-2">
          <p class="text-sm text-gray-400">步行+跑步距离</p>
          <p class="font-semibold">0.8 <span class="text-sm font-normal">mi</span></p>
        </div>
      </div>
    </div>
    <div class="mt-3 flex items-center justify-between">
        <div class="flex space-x-1">
            <div v-for="i in 24" :key="i" class="w-2.5 h-2.5 rounded-full" :class="i <= 18 ? 'bg-cyan-400' : 'bg-gray-600'"></div>
        </div>
        <div class="text-xs text-gray-400">站立时长 -- 分钟</div>
    </div>
  </div>
</template>

<script setup>
</script> 