<template>
  <div class="glassmorphism-card rounded-2xl p-4 text-white h-40 flex flex-col justify-between">
    <div class="flex justify-between items-start">
      <div class="flex items-center">
        <svg class="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
        </svg>
        <span class="ml-2 text-base font-bold">步行稳定性</span>
      </div>
    </div>
    
    <div class="flex justify-between items-end">
        <div>
            <span class="text-4xl font-semibold">100</span>
            <span class="text-xl">%</span>
            <p class="text-sm text-gray-400">正常</p>
        </div>
        <div class="w-20 space-y-1.5">
            <div class="h-4 rounded-md bg-teal-300 relative">
                 <div class="w-3 h-3 bg-white rounded-full absolute -right-1 top-0.5"></div>
            </div>
            <div class="h-4 rounded-md bg-amber-500"></div>
            <div class="h-4 rounded-md bg-red-500"></div>
        </div>
    </div>

     <p class="text-xs text-gray-500">2025年7月9日</p>
  </div>
</template>

<script setup>
</script> 