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



    <!-- Audio Visualizer Container (横向音频柱状图) -->
    <div 
      class="mt-4 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out"
      :style="sphereContainerStyle"
      @click="handleSphereClick"
    >
      <!-- 横向音频可视化柱状图 -->
      <div class="flex items-end justify-center space-x-1.5 h-20 w-48 cursor-pointer transition-all duration-300 hover:scale-105">
        <div
          v-for="(bar, index) in audioVisualizationBars"
          :key="index"
          class="relative transition-all duration-150 ease-out"
          :style="{ 
            width: '6px', 
            height: `${bar.height}px`,
            background: isVoiceActive ? 
              `linear-gradient(90deg, 
                #1e293b 0%, 
                #475569 20%, 
                #cbd5e1 45%, 
                #f1f5f9 50%, 
                #cbd5e1 55%, 
                #475569 80%, 
                #1e293b 100%)` : 
              `linear-gradient(90deg, 
                #374151 0%, 
                #6b7280 20%, 
                #9ca3af 45%, 
                #d1d5db 50%, 
                #9ca3af 55%, 
                #6b7280 80%, 
                #374151 100%)`,
            borderRadius: '3px',
            boxShadow: isVoiceActive ? 
              `inset 1px 0 1px rgba(255,255,255,0.3), 
               inset -1px 0 1px rgba(0,0,0,0.3),
               0 0 ${Math.random() * 8 + 4}px rgba(99, 102, 241, 0.4),
               0 2px 4px rgba(0,0,0,0.3)` : 
              `inset 1px 0 1px rgba(255,255,255,0.2), 
               inset -1px 0 1px rgba(0,0,0,0.4),
               0 1px 3px rgba(0,0,0,0.3)`,
            transform: isVoiceActive ? 
              `translateY(${bar.offsetY}px) scaleY(${0.8 + Math.random() * 0.4}) scaleX(1.1)` : 
              `translateY(${bar.offsetY}px) scaleY(1) scaleX(1)`,
            opacity: isVoiceActive ? 
              0.9 + Math.random() * 0.1 : 
              0.8
          }"
        >
          <!-- 顶部圆形高光 -->
          <div 
            class="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1.5 rounded-full"
            :style="{
              background: isVoiceActive ? 
                'radial-gradient(ellipse at center, rgba(241,245,249,0.8) 0%, rgba(203,213,225,0.4) 70%, transparent 100%)' :
                'radial-gradient(ellipse at center, rgba(209,213,219,0.6) 0%, rgba(156,163,175,0.3) 70%, transparent 100%)'
            }"
          ></div>
        </div>
      </div>
    </div>
    
    <!-- Voice Assistant Hint -->
    <div v-if="showHint" class="flex justify-center items-center text-center text-gray-500 text-sm hint-pulse -mt-8 mb-4">
      <p>点击音频条与我语音对话</p>
      <div class="ml-2 cursor-pointer group relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        <div class="absolute bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 left-1/2 pointer-events-none">
          我可以语音回答您的健康问题，提供运动建议，分析健康数据。点击音频条开始对话！
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
  isRealTimeCallActive: Boolean,
  callStatus: String,
  audioVisualization: Array,
});

const route = useRoute();
const router = useRouter();
const showAddDeviceModal = ref(false);
const showVoiceSettingsModal = ref(false);

// 音频可视化相关状态
const audioVisualizationBars = ref([]);
const isVoiceActive = computed(() => 
  props.isRealTimeCallActive && (props.callStatus === 'listening' || props.callStatus === 'speaking')
);

// 初始化音频柱状图
const initializeAudioBars = () => {
  // 创建16个柱子，初始高度为随机值，并添加垂直偏移
  audioVisualizationBars.value = Array.from({ length: 16 }, () => ({
    height: Math.random() * 30 + 10,  // 10-40px的随机高度
    offsetY: 0  // 初始垂直偏移为0
  }));
};

// 更新音频可视化
const updateAudioBars = () => {
  if (props.audioVisualization && props.audioVisualization.length > 0) {
    // 使用从App.vue传来的音频数据
    audioVisualizationBars.value = props.audioVisualization.slice(0, 16).map((value, index) => {
      const currentBar = audioVisualizationBars.value[index] || { height: 15, offsetY: 0 };
      return {
        height: Math.max(8, Math.min(60, value * 0.6 + 8)),  // 限制在8-60px范围内
        offsetY: isVoiceActive.value ? (Math.sin(Date.now() * 0.01 + index * 0.5) * 8) : 0  // 上下运动幅度8px
      };
    });
  } else if (isVoiceActive.value) {
    // 如果没有真实音频数据但语音激活，生成动态效果
    audioVisualizationBars.value = audioVisualizationBars.value.map((bar, index) => ({
      height: Math.random() * 40 + 15,  // 15-55px的随机跳动
      offsetY: Math.sin(Date.now() * 0.008 + index * 0.8) * 10 + Math.random() * 6 - 3  // 更动态的上下运动
    }));
  } else {
    // 静止状态，轻微呼吸效果
    const time = Date.now() * 0.003;
    audioVisualizationBars.value = audioVisualizationBars.value.map((bar, index) => ({
      height: 15 + Math.sin(time + index * 0.5) * 5,
      offsetY: Math.sin(time * 0.5 + index * 0.3) * 2  // 静止时轻微的上下浮动
    }));
  }
};

// 启动动画循环
let animationFrameId;
const startAudioAnimation = () => {
  const animate = () => {
    updateAudioBars();
    animationFrameId = requestAnimationFrame(animate);
  };
  animate();
};

// Inject navigation visibility control
const setNavVisibility = inject('setNavVisibility');

// Open mall based on route query - This logic is now deprecated here
onMounted(() => {
  // if (route.query.show === 'mall') { // This logic is now moved
  // }
  
  // 初始化音频可视化
  initializeAudioBars();
  startAudioAnimation();
});

// Reset nav visibility when leaving the view
onUnmounted(() => {
  if (setNavVisibility) {
    setNavVisibility(true);
  }
  
  // 清理动画
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
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