<template>
  <div class="glassmorphism-card rounded-2xl p-4 text-white h-40 flex flex-col justify-between">
    <div class="flex justify-between items-start">
      <div class="flex items-center">
        <svg class="w-7 h-7" viewBox="0 0 32 32">
          <path fill="#ff453a" d="M2.5 16A13.5 13.5 0 0 1 16 2.5a1.5 1.5 0 0 1 0 3A10.5 10.5 0 0 0 5.5 16a1.5 1.5 0 0 1-3 0z"/>
          <path fill="#0a84ff" d="M29.5 16A13.5 13.5 0 0 0 16 2.5a1.5 1.5 0 0 0 0 3A10.5 10.5 0 0 1 26.5 16a1.5 1.5 0 0 0 3 0z"/>
        </svg>
        <span class="ml-2 text-base font-bold">心理压力</span>
      </div>
    </div>
    
    <div class="relative w-full flex-grow flex items-center justify-center">
      <svg class="absolute w-4/5" viewBox="0 0 100 50">
        <!-- Background Arc -->
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#333" stroke-width="8"></path>
        <!-- Segments -->
        <path d="M 10 50 A 40 40 0 0 1 23.68 15.36" fill="none" stroke="#ff453a" stroke-width="8"></path>
        <path d="M 23.68 15.36 A 40 40 0 0 1 50 10" fill="none" stroke="#af52de" stroke-width="8"></path>
        <path d="M 50 10 A 40 40 0 0 1 76.32 15.36" fill="none" stroke="#64d2ff" stroke-width="8"></path>
        <path d="M 76.32 15.36 A 40 40 0 0 1 90 50" fill="none" stroke="#0a84ff" stroke-width="8"></path>
      </svg>
      <span class="text-2xl font-semibold">--</span>
    </div>

    <div class="text-center text-xs text-gray-400 flex items-center justify-center">
       <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      暂无数据
    </div>
  </div>
</template>

<script setup>
</script> 