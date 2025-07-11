<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <!-- 手机外壳 -->
    <div class="relative bg-black rounded-[3rem] p-3 shadow-2xl">
      <!-- 手机边框 -->
      <div class="relative bg-black rounded-[2.5rem] overflow-hidden">
        <!-- 屏幕 -->
        <div class="relative w-[375px] h-[812px] bg-white rounded-[2rem] overflow-hidden">
          <!-- 刘海/动态岛 -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
            <div class="w-36 h-6 bg-black rounded-b-2xl flex items-center justify-center">
              <!-- 听筒 -->
              <div class="w-14 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>
          
          <!-- 页面内容 -->
          <div class="w-full h-full">
            <slot></slot>
          </div>
          
          <!-- Home指示器 -->
          <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50">
            <div class="w-32 h-1 bg-gray-800 rounded-full opacity-60"></div>
          </div>
        </div>
        
        <!-- 侧边按钮 -->
        <div class="absolute -left-1 top-24 w-1 h-12 bg-gray-800 rounded-l"></div>
        <div class="absolute -left-1 top-40 w-1 h-8 bg-gray-800 rounded-l"></div>
        <div class="absolute -left-1 top-52 w-1 h-8 bg-gray-800 rounded-l"></div>
        <div class="absolute -right-1 top-32 w-1 h-16 bg-gray-800 rounded-r"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 响应式调整 */
@media (max-width: 768px) {
  .w-\[375px\] {
    width: 320px;
  }
  
  .h-\[812px\] {
    height: 680px;
  }
}

@media (max-width: 480px) {
  .w-\[375px\] {
    width: 280px;
  }
  
  .h-\[812px\] {
    height: 600px;
  }
  
  .rounded-\[3rem\] {
    border-radius: 2rem;
  }
  
  .rounded-\[2\.5rem\] {
    border-radius: 1.5rem;
  }
  
  .rounded-\[2rem\] {
    border-radius: 1rem;
  }
}
</style> 