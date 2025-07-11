<template>
  <div class="bg-[#1c1c1e] rounded-2xl p-4 text-white flex flex-col justify-between h-48">
    <div class="flex justify-between items-center">
      <div>
        <p class="text-lg font-semibold">心率</p>
        <p class="text-xs text-gray-400">过去 9 小时</p>
      </div>
      <div class="flex items-center space-x-2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
    <div class="flex items-end justify-between mt-2">
      <div class="flex-1">
        <div class="flex items-baseline">
          <p class="text-5xl font-bold text-red-400">85</p>
          <p class="text-lg ml-1 text-red-400">bpm</p>
        </div>
        <p class="text-sm text-gray-400 mt-1">59 分钟前</p>
      </div>
      <div class="flex-1 h-24 relative -mb-4 -mr-4">
        <!-- This is a simplified representation of the chart. -->
        <svg class="w-full h-full" viewBox="0 0 120 60" preserveAspectRatio="none">
          <path d="M 10 35 C 15 32, 20 30, 25 32 S 35 38, 40 35 S 50 28, 55 30 S 65 40, 70 35 L 75 32 L 80 35 S 90 38, 95 36 S 105 34, 110 35" stroke="#f87171" fill="none" stroke-width="2"/>
          <g class="text-xs text-gray-400" fill="currentColor" style="font-size: 8px;">
            <text x="40" y="55" text-anchor="middle">12</text>
            <text x="60" y="55" text-anchor="middle">14</text>
            <text x="80" y="55" text-anchor="middle">16</text>
            <text x="100" y="55" text-anchor="middle">18</text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
</script> 