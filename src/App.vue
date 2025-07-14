<template>
  <!-- 登录页面和探索页面 - 全屏显示 -->
  <div v-if="route.path === '/' || route.path === '/explore'" class="h-screen w-full">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
  
  <!-- 其他页面 - 手机框架显示 -->
  <div v-else 
    class="bg-gray-800 min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
    style="background-image: url('https://images.unsplash.com/photo-1646038459235-959955b2441a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
  >
    <!-- Phone Frame -->
    <div class="w-[450px] h-[880px] bg-neutral-900/50 rounded-[60px] p-4 shadow-2xl border-4 border-neutral-800/60">
      <!-- Phone Screen -->
      <div class="bg-black/80 w-full h-full rounded-[45px] overflow-hidden relative flex flex-col">
        
        <!-- 实时语音状态显示 -->
        <div v-if="isRealTimeCallActive" class="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-40 backdrop-blur-sm">
          <div class="w-full max-w-md p-4 text-center">
            
            <!-- 状态指示器 -->
            <div class="mb-6 text-sm font-medium text-white transition-opacity duration-300" :class="{'opacity-50': callStatus !== 'connected' && callStatus !== 'listening'}">
              {{ statusText }}
            </div>

            <!-- 音频可视化 -->
            <div class="relative h-24 w-full flex items-center justify-center overflow-hidden">
              <div
                v-for="(bar, index) in audioVisualization"
                :key="index"
                class="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400 transition-all duration-100"
                :style="{ height: `${Math.min(bar, 100)}%`, opacity: `${0.5 + Math.min(bar, 100) / 200}` }"
              ></div>
            </div>

            <!-- 错误信息 -->
            <div v-if="callError" class="mt-4 text-red-400 text-sm">
              错误: {{ callError }}
            </div>
          </div>
        </div>

        <!-- Scrollable Main Content -->
        <main ref="mainContentRef" class="flex-1 overflow-y-auto">
          <router-view v-slot="{ Component }">
            <component 
              :is="Component" 
              :sphereContainerStyle="sphereContainerStyle"
              :handleSphereClick="handleSphereClick"
              :sphereTransformStyle="sphereTransformStyle"
              :showHint="showHint"
            />
          </router-view>
          <!-- Spacer for bottom nav - 只在显示底部导航栏时需要 -->
          <div v-if="showBottomNav" class="h-24"></div>
        </main>

        <!-- Bottom Navigation - 只在非登录页面显示 -->
        <div v-if="showBottomNav" class="absolute bottom-0 left-0 right-0">
          <BottomNavBar />
        </div>
      </div>
    </div>
    <audio ref="clickSound" src="https://www.orangefreesounds.com/wp-content/uploads/2017/04/Clicking-sound-effect.mp3" preload="auto"></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import BottomNavBar from './components/BottomNavBar.vue';
import speechService from './utils/speechService.js';

// --- 路由控制 ---
const route = useRoute();

// --- Navigation Visibility Control ---
// const isNavVisible = ref(true); // Deprecated
// provide('setNavVisibility', (isVisible) => { // Deprecated
//   isNavVisible.value = isVisible;
// });

// 控制底部导航栏显示
const loginStatus = ref(sessionStorage.getItem('tempLoginStatus') === 'true');

const showBottomNav = computed(() => {
  const noNavRoutes = ['/', '/explore', '/mall', '/customization'];
  // 如果在不需要导航栏的页面，则不显示
  if (noNavRoutes.includes(route.path)) {
    return false;
  }
  
  // 检查是否有登录状态
  return loginStatus.value;
});

// 更新登录状态的函数
const updateLoginStatus = () => {
  loginStatus.value = sessionStorage.getItem('tempLoginStatus') === 'true';
};

// 定时器引用
let statusCheckInterval = null;

// 监听登录状态变化
watch(() => route.path, () => {
  // 路由变化时更新登录状态
  updateLoginStatus();
}, { immediate: true });

// --- Real-time Voice Call State ---
const isRealTimeCallActive = ref(false)
const callStatus = ref('idle') // 'idle', 'connecting', 'listening', 'speaking', 'error'
const callError = ref('')
const currentUserSpeech = ref('')
const currentAIResponse = ref('')
const isUserSpeaking = ref(false)
const isAISpeaking = ref(false)
const audioVisualization = ref([])

// 语音状态文本
const statusText = computed(() => {
  switch (callStatus.value) {
    case 'connecting': return '连接中...';
    case 'connected': return '已连接';
    case 'listening': return '请说话...';
    case 'speaking': return '正在转换声音...';
    case 'error': return '出现错误';
    default: return '准备就绪';
  }
});

// 获取当前语音状态用于显示
const voiceCallStatus = computed(() => {
  if (!isRealTimeCallActive.value) return 'idle'
  return callStatus.value
})



// --- Sound & Vibration ---
const clickSound = ref(null);
const isSphereClicked = ref(false);

// 修改后的handleSphereClick函数，支持语音通话
const handleSphereClick = async () => {
  console.log('🔮 浮动球被点击，当前状态:', {
    isRealTimeCallActive: isRealTimeCallActive.value,
    callStatus: callStatus.value
  })
  
  // 播放点击音效和震动
  if (clickSound.value) {
    clickSound.value.currentTime = 0;
    clickSound.value.play();
  }
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  
  // 视觉反馈
  isSphereClicked.value = true;
  setTimeout(() => {
    isSphereClicked.value = false;
  }, 150);

  // 实时语音通话逻辑
  if (isRealTimeCallActive.value) {
    // 结束实时通话
    console.log('🛑 准备结束语音通话')
    await endRealTimeCall()
  } else {
    // 开始实时通话
    console.log('🎙️ 准备开始语音通话')
    await startRealTimeCall()
  }
};

// 开始实时语音通话
const startRealTimeCall = async () => {
  if (isRealTimeCallActive.value) return;
  console.log('开始启动语音通话流程...');
  try {
    callStatus.value = 'connecting';
    callError.value = '';

    // 设置事件监听器
    speechService.setErrorHandler(handleSpeechError);
    speechService.setStatusChangeHandler(handleStatusChange);

    // 连接到服务
    await speechService.connect();
    
    // 如果连接成功，则开始监听
    if (speechService.isReady()) {
      isRealTimeCallActive.value = true;
      await speechService.startListening();
      console.log('语音通话服务已连接并开始监听。');
      updateAudioVisualization(); // 启动可视化
    } else {
      throw new Error('语音服务连接失败，请检查日志。');
    }
  } catch (error) {
    console.error('启动语音通话失败:', error);
    handleSpeechError(error.message || '启动失败');
  }
};

// 结束实时语音通话
const endRealTimeCall = async () => {
  if (!isRealTimeCallActive.value) return;
  console.log('正在结束语音通话...');
  isRealTimeCallActive.value = false;
  callStatus.value = 'idle';
  speechService.cleanup();
  console.log('语音通话已结束并清理资源。');
};

// 处理语音错误
const handleSpeechError = (error) => {
  console.error('语音服务错误:', error)
  callError.value = error
  callStatus.value = 'error'
  
  // 错误时自动结束通话
  setTimeout(() => {
    endRealTimeCall()
  }, 2000)
}

// 处理状态变化
const handleStatusChange = (status) => {
  console.log('状态变更:', status);
  callStatus.value = status;
  
  switch (status) {
    case 'listening':
      isUserSpeaking.value = false
      isAISpeaking.value = false
      break
    case 'speaking':
      isUserSpeaking.value = false
      isAISpeaking.value = true
      break
    case 'connected':
      // 连接成功时的处理
      break
    case 'disconnected':
      if (isRealTimeCallActive.value) {
        callError.value = '连接已断开'
      }
      break
  }
}

// 更新音频可视化
const updateAudioVisualization = () => {
  if (isRealTimeCallActive.value && speechService) {
    const audioData = speechService.getAudioData()
    if (audioData && audioData.length > 0) {
      // 转换为可视化数据，取前32个元素
      audioVisualization.value = Array.from(audioData).slice(0, 32).map(value => value * 2)
    } else {
      // 如果没有音频数据，生成随机可视化效果
      audioVisualization.value = Array.from({length: 32}, () => Math.random() * 100 + 50)
    }
  } else {
    audioVisualization.value = []
  }
  
  if (isRealTimeCallActive.value) {
    requestAnimationFrame(updateAudioVisualization)
  }
}

// --- Hint Animation ---
const showHint = ref(false);

// --- Scroll Animation ---
const mainContentRef = ref(null);
const scrollY = ref(0);

const handleScroll = () => {
  if (mainContentRef.value) {
    scrollY.value = mainContentRef.value.scrollTop;
  }
};

const sphereContainerStyle = computed(() => {
  const scrollThreshold = 200; // The scroll distance over which the animation occurs
  const progress = Math.min(scrollY.value / scrollThreshold, 1);
  const height = 440 * (1 - progress); // Half of 880px screen height
  return {
    height: `${height}px`,
  };
});

const sphereTransformStyle = computed(() => {
  const scrollThreshold = 200;
  const progress = Math.min(scrollY.value / scrollThreshold, 1);
  const scrollScale = 1 - progress;
  const clickScale = isSphereClicked.value ? 0.9 : 1;
  
  // 根据实时语音状态调整样式
  let voiceScale = 1;
  let voiceFilter = '';
  
  if (callStatus.value === 'connecting') {
    voiceScale = 1.05;
    voiceFilter = 'hue-rotate(60deg) brightness(1.2)'; // 黄色调 - 连接中
  } else if (callStatus.value === 'listening') {
    voiceScale = 1.1;
    voiceFilter = 'hue-rotate(120deg) brightness(1.3)'; // 绿色调 - 监听中
  } else if (callStatus.value === 'speaking') {
    voiceScale = 1.08;
    voiceFilter = 'hue-rotate(240deg) brightness(1.15)'; // 蓝色调 - AI说话
  } else if (callStatus.value === 'error') {
    voiceScale = 1.02;
    voiceFilter = 'hue-rotate(0deg) brightness(1.1) saturate(1.5)'; // 红色调 - 错误
  } else if (isRealTimeCallActive.value) {
    voiceScale = 1.05;
    voiceFilter = 'brightness(1.1)'; // 通话激活状态
  }
  
  // Combine breathing scale, scroll scale, click scale, and voice scale
  return {
    transform: `scale(${scale.value * scrollScale * clickScale * voiceScale})`,
    opacity: 1 - progress,
    filter: voiceFilter,
    transition: 'transform 0.1s ease-out, filter 0.3s ease-out', // Smooth transition for click and voice
  };
});

// --- Breathing Animation ---
const scale = ref(1);
let animationFrameId;
function animateSphere() {
  const time = performance.now() * 0.001;
  
  // 根据实时语音状态调整呼吸频率
  let breathingRate = 1;
  let breathingAmplitude = 0.05;
  
  if (callStatus.value === 'connecting') {
    breathingRate = 1.8; // 连接时呼吸较快
    breathingAmplitude = 0.06;
  } else if (callStatus.value === 'listening') {
    breathingRate = 2.2; // 监听时呼吸最快，显示活跃状态
    breathingAmplitude = 0.08;
  } else if (callStatus.value === 'speaking') {
    breathingRate = 0.7; // AI说话时呼吸较慢
    breathingAmplitude = 0.1;
  } else if (callStatus.value === 'error') {
    breathingRate = 0.5; // 错误时呼吸很慢
    breathingAmplitude = 0.03;
  } else if (isRealTimeCallActive.value) {
    breathingRate = 1.2; // 通话激活时稍快
    breathingAmplitude = 0.06;
  }
  
  scale.value = 1 + Math.sin(time * breathingRate) * breathingAmplitude;
  animationFrameId = requestAnimationFrame(animateSphere);
}

onMounted(() => {
  mainContentRef.value?.addEventListener('scroll', handleScroll, { passive: true });
  animateSphere();
  setTimeout(() => {
    showHint.value = true;
  }, 2500); // Show hint after 2.5 seconds
  
  // 监听存储变化，确保登录状态改变时及时更新UI
  window.addEventListener('storage', updateLoginStatus);
  window.addEventListener('loginStatusChanged', updateLoginStatus);
  
  // 定期检查登录状态（确保状态同步）
  statusCheckInterval = setInterval(updateLoginStatus, 1000);
  
  // 自动加载保存的语音设置
  loadVoiceSettings();
  
  // 添加全局调试函数到window对象
  setupGlobalDebugTools();
});

// 加载保存的语音设置
const loadVoiceSettings = () => {
  // 首先尝试加载新的统一设置格式
  const unifiedSettings = localStorage.getItem('elevenLabsSettings');
  if (unifiedSettings) {
    try {
      const settings = JSON.parse(unifiedSettings);
      if (settings.apiKey) {
        speechService.setElevenLabsApiKey(settings.apiKey);
        console.log('✅ ElevenLabs API密钥已加载');
      }
      if (settings.agentId) {
        speechService.setAgentConfig(settings.agentId);
        console.log('✅ Conversational AI Agent已加载:', settings.agentId);
      } else if (settings.voiceId) {
        // 向后兼容：将voiceId作为agentId使用
        speechService.setAgentConfig(settings.voiceId);
        console.log('✅ Agent配置已加载（向后兼容）:', settings.voiceId);
      }
      return;
    } catch (error) {
      console.error('❌ 解析语音设置失败:', error);
    }
  }
  
  // 如果没有统一设置，则尝试加载旧格式（向后兼容）
  const savedApiKey = localStorage.getItem('elevenLabsApiKey');
  const savedVoice = localStorage.getItem('elevenLabsVoiceId');
  
  if (savedApiKey) {
    speechService.setElevenLabsApiKey(savedApiKey);
    console.log('✅ ElevenLabs API密钥已加载（旧格式）');
  }
  
  if (savedVoice) {
    speechService.setAgentConfig(savedVoice);
    console.log('✅ Agent配置已加载（旧格式）:', savedVoice);
  }
  
  if (!savedApiKey && !unifiedSettings) {
    console.log('⚠️ 未找到ElevenLabs API密钥，请在Conversational AI设置中配置');
  }
};

// 设置全局调试工具
const setupGlobalDebugTools = () => {
  // 添加调试函数到window对象，方便在控制台中使用
  window.debugHealthWatch = {
    // 诊断Conversational AI服务
    diagnoseConversationalAI: () => {
      console.log('🔧 HealthWatch Conversational AI 诊断');
      console.log('='.repeat(50));
      
      const diagnostic = speechService.getDiagnosticInfo();
      
      console.log('📊 基本信息:');
      console.log(`  API密钥: ${diagnostic.apiKey}`);
      console.log(`  Agent ID: ${diagnostic.agentId}`);
      console.log(`  对话ID: ${diagnostic.conversationId}`);
      console.log(`  连接状态: ${diagnostic.isConnected ? '已连接' : '未连接'}`);
      console.log(`  监听状态: ${diagnostic.isListening ? '监听中' : '未监听'}`);
      console.log(`  说话状态: ${diagnostic.isSpeaking ? '说话中' : '未说话'}`);
      console.log(`  对话历史: ${diagnostic.conversationHistory}`);
      
      console.log('\n🌐 环境支持:');
      console.log(`  HTTPS: ${diagnostic.environment.https ? '✅' : '❌'}`);
      console.log(`  WebSocket: ${diagnostic.environment.webSocket ? '✅' : '❌'}`);
      console.log(`  麦克风API: ${diagnostic.environment.mediaDevices ? '✅' : '❌'}`);
      console.log(`  音频上下文: ${diagnostic.environment.audioContext ? '✅' : '❌'}`);
      
      console.log('\n🔊 音频格式支持:');
      if (diagnostic.audioSupport && diagnostic.audioSupport.length > 0) {
        diagnostic.audioSupport.forEach(format => {
          console.log(`  ${format.mimeType}: ${format.support} ${format.extensions.join(', ')}`);
        });
      } else {
        console.log('  ❌ 未检测到支持的音频格式');
      }
      
      console.log('\n💡 建议:');
      diagnostic.recommendations.forEach(rec => {
        console.log(`  ${rec}`);
      });
      
      console.log('\n📋 本地存储:');
      const settings = localStorage.getItem('elevenLabsSettings');
      if (settings) {
        try {
          const parsed = JSON.parse(settings);
          console.log('  设置已保存:', {
            hasApiKey: !!parsed.apiKey,
            agentId: parsed.agentId,
            voiceId: parsed.voiceId // 向后兼容显示
          });
        } catch (e) {
          console.log('  ❌ 设置格式错误');
        }
      } else {
        console.log('  ❌ 未找到保存的设置');
      }
      
      console.log('='.repeat(50));
      return diagnostic;
    },
    
    // 保持向后兼容的别名
    diagnoseVoice: function() {
      console.warn('🔄 diagnoseVoice 已弃用，请使用 diagnoseConversationalAI');
      return this.diagnoseConversationalAI();
    },
    
    // 测试API连接
    testAPI: async (apiKey) => {
      if (apiKey) {
        speechService.setElevenLabsApiKey(apiKey);
      }
      
      try {
        const result = await speechService.testConnection();
        console.log('✅ API测试成功:', result);
        return result;
      } catch (error) {
        console.error('❌ API测试失败:', error.message);
        return { success: false, error: error.message };
      }
    },
    
    // 清理Conversational AI服务
    cleanup: () => {
      speechService.cleanup();
      console.log('🧹 Conversational AI 服务已清理');
    },
    
    // 获取对话历史
    getConversationHistory: () => {
      const history = speechService.getConversationHistory();
      console.log('📝 对话历史:');
      history.forEach((msg, index) => {
        console.log(`  ${index + 1}. [${msg.type}] ${msg.content} (${msg.timestamp.toLocaleTimeString()})`);
      });
      return history;
    },
    
    // 清除对话历史
    clearConversationHistory: () => {
      speechService.clearConversationHistory();
      console.log('🗑️ 对话历史已清除');
    },
    
    // 获取完整状态
    getFullStatus: () => {
      return {
        conversationalAI: speechService.getDiagnosticInfo(),
        realTimeCall: {
          isActive: isRealTimeCallActive.value,
          status: callStatus.value,
          error: callError.value
        },
        ui: {
          showHint: showHint.value,
          loginStatus: loginStatus.value
        }
      };
    },
    
    // 帮助信息
    help: () => {
      console.log('🔧 HealthWatch Conversational AI 调试工具');
      console.log('='.repeat(50));
      console.log('可用命令:');
      console.log('  debugHealthWatch.diagnoseConversationalAI() - 诊断 Conversational AI');
      console.log('  debugHealthWatch.testAPI("your_api_key") - 测试API连接');
      console.log('  debugHealthWatch.cleanup() - 清理服务');
      console.log('  debugHealthWatch.getConversationHistory() - 获取对话历史');
      console.log('  debugHealthWatch.clearConversationHistory() - 清除对话历史');
      console.log('  debugHealthWatch.getFullStatus() - 获取完整状态');
      console.log('  debugHealthWatch.help() - 显示帮助');
      console.log('='.repeat(50));
      console.log('🔧 向后兼容:');
      console.log('  debugHealthWatch.diagnoseVoice() - 同 diagnoseConversationalAI()');
      console.log('='.repeat(50));
      console.log('快速诊断: debugHealthWatch.diagnoseConversationalAI()');
    }
  };
  
  // 在控制台显示欢迎信息
  console.log('🎉 HealthWatch Conversational AI 调试工具已加载!');
  console.log('输入 debugHealthWatch.help() 查看可用命令');
  console.log('升级说明: 现已支持 ElevenLabs Conversational AI，体验更自然的语音对话!');
};

onUnmounted(() => {
  mainContentRef.value?.removeEventListener('scroll', handleScroll);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  // 清理语音服务
  if (isRealTimeCallActive.value) {
    endRealTimeCall();
  }
  
  // 清理登录状态监听器
  window.removeEventListener('storage', updateLoginStatus);
  window.removeEventListener('loginStatusChanged', updateLoginStatus);
  
  // 清理定时器
  if (statusCheckInterval) {
    clearInterval(statusCheckInterval);
  }
});
</script>

<style>
/* Using a common font for better look and feel */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes hint-pulse-animation {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.hint-pulse {
  animation: hint-pulse-animation 3s ease-in-out infinite;
}

@keyframes morph {
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}
.liquid-sphere {
  animation: morph 8s ease-in-out infinite;
  background: linear-gradient(135deg, #a8b2ff, #f3b0ff);
}

/* Custom scrollbar for webkit browsers */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.3);
  border-radius: 20px;
  border: transparent;
}
</style> 