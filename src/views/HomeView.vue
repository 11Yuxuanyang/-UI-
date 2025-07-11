<template>
  <div>
    <!-- Header with Add Device Icon -->
    <div class="flex justify-between items-center px-6 pt-4 pb-2">
      <div class="text-white">
        <h2 class="text-2xl font-bold">健康助手</h2>
        <p class="text-sm text-gray-400">{{ getCurrentDate() }}</p>
      </div>
      <!-- Add Button -->
      <div class="relative">
        <button 
          @click="showAddDeviceModal = true"
          class="p-1 hover:opacity-70 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </button>
        
        <!-- Add Menu Modal -->
        <div v-if="showAddDeviceModal" 
             class="absolute top-8 right-0 bg-gray-700/95 backdrop-blur-lg rounded-2xl p-1 w-32 border border-gray-600 shadow-xl z-50"
             @click.stop>
          <div class="space-y-1">
            <button class="w-full p-3 hover:bg-gray-600/50 rounded-xl transition-colors text-center">
              <span class="text-white text-sm">扫一扫</span>
            </button>
            
            <div class="border-t border-gray-600/50"></div>
            
            <button class="w-full p-3 hover:bg-gray-600/50 rounded-xl transition-colors text-center">
              <span class="text-white text-sm">添加设备</span>
            </button>
            
            <div class="border-t border-gray-600/50"></div>
            
            <button @click="openMall" class="w-full p-3 hover:bg-gray-600/50 rounded-xl transition-colors text-center">
              <span class="text-white text-sm">商城</span>
            </button>
            
            <div class="border-t border-gray-600/50"></div>
            
            <button @click="openVoiceSettings" class="w-full p-3 hover:bg-gray-600/50 rounded-xl transition-colors text-center">
              <span class="text-white text-sm">语音设置</span>
            </button>
            
            <div class="border-t border-gray-600/50"></div>
            
            <button @click="testVoice" class="w-full p-3 hover:bg-gray-600/50 rounded-xl transition-colors text-center">
              <span class="text-white text-sm">测试语音</span>
            </button>
          </div>
        </div>
      </div>
    </div>



    <!-- Sphere Container (now inside the scrollable area) -->
    <div 
      class="mt-4 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out"
      :style="sphereContainerStyle"
      @click="handleSphereClick"
    >
      <div 
        class="relative w-32 h-32 liquid-sphere"
        :style="sphereTransformStyle"
      >
      </div>
    </div>
    
    <!-- Voice Assistant Hint -->
    <div v-if="showHint" class="flex justify-center items-center text-center text-gray-500 text-sm hint-pulse -mt-8 mb-4">
      <p>点击与我语音对话</p>
      <div class="ml-2 cursor-pointer group relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        <div class="absolute bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 left-1/2 pointer-events-none">
          我可以语音回答您的健康问题，提供运动建议，分析健康数据。点击浮动球开始对话！
          <svg class="absolute text-gray-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div v-if="showHint" class="mb-6">
      <ChatInput />
    </div>

    <!-- Yesterday Health Report -->
    <div v-if="showHint" class="px-6 mb-6">
      <div class="glassmorphism-card rounded-2xl p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium text-sm">昨日健康报告</h3>
              <p class="text-gray-400 text-xs">{{ getYesterdayDate() }}</p>
            </div>
          </div>
          <router-link
            to="/health-summary"
            class="text-blue-400 text-xs hover:text-blue-300 transition-colors"
          >
            查看详情 →
          </router-link>
        </div>
        
        <!-- Report Summary -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-gray-300 text-sm">整体状态</span>
            <div class="flex items-center space-x-1">
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              <span class="text-green-400 text-sm font-medium">良好</span>
            </div>
          </div>
          <div class="flex space-x-4 text-xs">
            <span class="text-gray-400">步数 <span class="text-white">9,247</span></span>
            <span class="text-gray-400">睡眠 <span class="text-white">7.2h</span></span>
            <span class="text-gray-400">心率 <span class="text-white">68 bpm</span></span>
          </div>
        </div>

        <!-- Detailed Report is removed, now on a separate page -->
      </div>
    </div>

    <!-- Cards -->
    <div class="px-6">
      <ActivityCard />
      <div class="mt-4">
        <HeartRateCard />
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <StressCard />
        <StabilityCard />
      </div>
    </div>

    <!-- Click outside to close -->
    <div v-if="showAddDeviceModal" 
         class="fixed inset-0 z-40"
         @click="showAddDeviceModal = false">
    </div>

    <!-- Voice Settings Modal -->
    <VoiceSettings 
      v-if="showVoiceSettingsModal" 
      @close="closeVoiceSettings"
      @saved="onVoiceSettingsSaved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ActivityCard from '../components/ActivityCard.vue';
import HeartRateCard from '../components/HeartRateCard.vue';
import StressCard from '../components/StressCard.vue';
import StabilityCard from '../components/StabilityCard.vue';
import ChatInput from '../components/ChatInput.vue';
import VoiceSettings from '../components/VoiceSettings.vue';
import speechService from '../utils/speechService.js';

// This is a placeholder for the props that will be passed down from App.vue
const props = defineProps({
  sphereContainerStyle: Object,
  handleSphereClick: Function,
  sphereTransformStyle: Object,
  showHint: Boolean,
});

const route = useRoute();
const router = useRouter();
const showAddDeviceModal = ref(false);
const showVoiceSettingsModal = ref(false);

// Inject navigation visibility control
const setNavVisibility = inject('setNavVisibility');

// Open mall based on route query - This logic is now deprecated here
onMounted(() => {
  // if (route.query.show === 'mall') { // This logic is now moved
  // }
});

// Reset nav visibility when leaving the view
onUnmounted(() => {
  if (setNavVisibility) {
    setNavVisibility(true);
  }
});


// 状态管理
const openMall = () => {
  showAddDeviceModal.value = false;
  router.push('/mall');
};

// 语音设置相关方法
const openVoiceSettings = () => {
  showAddDeviceModal.value = false;
  showVoiceSettingsModal.value = true;
};

const closeVoiceSettings = () => {
  showVoiceSettingsModal.value = false
}

const onVoiceSettingsSaved = () => {
  console.log('语音设置已保存')
  // 这里可以添加额外的处理逻辑，比如显示成功提示
}

const testVoice = async () => {
  try {
    console.log('开始语音功能测试...')
    showAddDeviceModal.value = false
    
    // 测试语音合成
    if (speechService) {
      // 生成一个测试回复并播放
      await speechService.generateAIResponseAndSpeak('语音功能测试')
      console.log('语音测试完成')
    } else {
      console.error('语音服务未初始化')
    }
  } catch (error) {
    console.error('语音测试失败:', error)
  }
}

// 获取当前日期
const getCurrentDate = () => {
  const today = new Date()
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  }
  return today.toLocaleDateString('zh-CN', options)
}

// 获取昨天日期
const getYesterdayDate = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const options = { 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  }
  return yesterday.toLocaleDateString('zh-CN', options)
}
</script>

<style scoped>
/* All mall-related styles have been removed */
</style> 