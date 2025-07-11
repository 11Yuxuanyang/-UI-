<template>
  <div class="glassmorphism-card rounded-full px-4 py-2 flex items-center shadow-lg max-w-sm mx-auto">
    <input
      type="text"
      placeholder="开始聊天..."
      class="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none pl-2"
      v-model="message"
      @keyup.enter="sendMessage"
    />
    
    <!-- Camera Button -->
    <button 
      @click="openCamera" 
      class="ml-2 text-gray-400 hover:text-blue-400 transition-colors"
      title="拍照记录饮食"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
    
    <!-- Send Button -->
    <button 
      @click="sendMessage"
      class="ml-2 text-gray-400 hover:text-white transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    </button>
  </div>

  <!-- Camera Modal -->
  <div v-if="showCamera" 
       class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-gray-900 rounded-2xl p-4 w-full max-w-md">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-white font-semibold">记录饮食</h3>
        <button @click="closeCamera" class="text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Camera Preview -->
      <div class="relative mb-4">
        <video 
          ref="videoElement"
          v-if="!capturedImage"
          class="w-full h-64 bg-black rounded-lg object-cover"
          autoplay
          playsinline
        ></video>
        
        <!-- Captured Image Preview -->
        <img 
          v-if="capturedImage"
          :src="capturedImage"
          class="w-full h-64 bg-black rounded-lg object-cover"
          alt="拍摄的食物"
        />
        
        <!-- Camera overlay -->
        <div v-if="!capturedImage" class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-48 h-48 border-2 border-white/50 rounded-lg"></div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex justify-center space-x-4">
        <button 
          v-if="!capturedImage"
          @click="capturePhoto"
          class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
        
        <template v-if="capturedImage">
          <button 
            @click="retakePhoto"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            重拍
          </button>
          <button 
            @click="savePhoto"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            保存分析
          </button>
        </template>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
        <p class="text-red-400 text-sm">{{ errorMessage }}</p>
      </div>
    </div>
  </div>

  <!-- Canvas for capturing -->
  <canvas ref="canvasElement" class="hidden"></canvas>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const message = ref('')
const showCamera = ref(false)
const capturedImage = ref(null)
const errorMessage = ref('')
const videoElement = ref(null)
const canvasElement = ref(null)
let stream = null

const sendMessage = () => {
  if (message.value.trim()) {
    console.log('发送消息:', message.value)
    message.value = ''
  }
}

const openCamera = async () => {
  showCamera.value = true
  errorMessage.value = ''
  
  try {
    // 请求摄像头权限
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment', // 优先使用后置摄像头
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    })
    
    // 等待DOM更新
    await new Promise(resolve => setTimeout(resolve, 100))
    
    if (videoElement.value) {
      videoElement.value.srcObject = stream
    }
  } catch (error) {
    console.error('摄像头访问失败:', error)
    if (error.name === 'NotAllowedError') {
      errorMessage.value = '请允许访问摄像头以拍摄食物照片'
    } else if (error.name === 'NotFoundError') {
      errorMessage.value = '未找到可用的摄像头设备'
    } else {
      errorMessage.value = '摄像头启动失败，请检查设备权限'
    }
  }
}

const closeCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
  showCamera.value = false
  capturedImage.value = null
  errorMessage.value = ''
}

const capturePhoto = () => {
  if (!videoElement.value || !canvasElement.value) return
  
  const video = videoElement.value
  const canvas = canvasElement.value
  const context = canvas.getContext('2d')
  
  // 设置canvas尺寸
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  
  // 绘制视频帧到canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  // 转换为图片数据
  capturedImage.value = canvas.toDataURL('image/jpeg', 0.8)
  
  // 停止摄像头
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
}

const retakePhoto = () => {
  capturedImage.value = null
  openCamera()
}

const savePhoto = () => {
  if (capturedImage.value) {
    // 这里可以添加图片分析逻辑
    console.log('保存食物照片，开始分析卡路里...')
    
    // 模拟AI分析结果
    const analysisResult = {
      food: '苹果',
      calories: 85,
      nutrition: {
        carbs: '22g',
        protein: '0.3g',
        fat: '0.2g'
      }
    }
    
    // 发送分析结果到聊天
    const analysisMessage = `📸 已识别食物：${analysisResult.food}\n🔥 预估卡路里：${analysisResult.calories} kcal\n📊 营养成分：碳水${analysisResult.nutrition.carbs}，蛋白质${analysisResult.nutrition.protein}，脂肪${analysisResult.nutrition.fat}`
    
    console.log('AI分析结果:', analysisMessage)
    
    // 关闭摄像头模态框
    closeCamera()
    
    // 这里可以触发父组件的事件或者直接显示分析结果
    // emit('food-analyzed', analysisResult)
  }
}

// 组件卸载时清理摄像头
onUnmounted(() => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
})
</script> 