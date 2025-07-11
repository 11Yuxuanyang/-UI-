<template>
  <div class="voice-settings-modal fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 rounded-2xl p-6 max-w-md w-full border border-white/10 backdrop-blur-md">
      <!-- 头部 -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-white">Conversational AI 设置</h2>
        <button 
          @click="$emit('close')"
          class="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-colors"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- API 密钥设置 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          ElevenLabs API 密钥
        </label>
        <div class="relative">
          <input
            v-model="apiKey"
            :type="showApiKey ? 'text' : 'password'"
            class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors"
            placeholder="输入您的 ElevenLabs API 密钥"
          />
          <button
            @click="showApiKey = !showApiKey"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            <svg v-if="showApiKey" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
            </svg>
          </button>
        </div>
        <p class="text-xs text-gray-400 mt-2">
          在 elevenlabs.io 获取您的API密钥
        </p>
      </div>

      <!-- Agent ID设置 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🤖 Agent ID
        </label>
        <input
          v-model="agentId"
          class="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-colors"
          placeholder="输入您的 Conversational AI Agent ID"
        />
        <p class="text-xs text-gray-400 mt-2">
          在 ElevenLabs 控制台创建 Conversational AI Agent 后获取
        </p>
      </div>

      <!-- 状态信息 -->
      <div v-if="statusMessage" class="mb-4 p-3 rounded-lg" :class="{
        'bg-green-500/20 border border-green-500/30': statusType === 'success',
        'bg-red-500/20 border border-red-500/30': statusType === 'error',
        'bg-blue-500/20 border border-blue-500/30': statusType === 'info'
      }">
        <p class="text-sm" :class="{
          'text-green-400': statusType === 'success',
          'text-red-400': statusType === 'error',
          'text-blue-400': statusType === 'info'
        }">{{ statusMessage }}</p>
      </div>

      <!-- 测试和保存按钮 -->
      <div class="flex gap-3 mb-6">
        <button
          @click="testAgent"
          :disabled="isTesting || !apiKey || !agentId"
          class="flex-1 py-3 px-4 bg-blue-600/80 hover:bg-blue-600 disabled:bg-gray-600/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <svg v-if="isTesting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isTesting ? '测试中...' : '测试 Agent' }}
        </button>
        <button
          @click="saveSettings"
          class="flex-1 py-3 px-4 bg-green-600/80 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          保存设置
        </button>
      </div>

      <!-- 调试信息 -->
      <div class="mt-4 p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg">
        <h3 class="text-sm font-medium text-gray-300 mb-2">调试信息</h3>
        <div class="space-y-1 text-xs text-gray-400">
          <div>API密钥状态: <span :class="apiKey ? 'text-green-400' : 'text-red-400'">{{ apiKey ? '已设置' : '未设置' }}</span></div>
          <div>Agent ID: <span :class="agentId ? 'text-blue-400' : 'text-red-400'">{{ agentId || '未设置' }}</span></div>
          <div>浏览器支持: <span :class="browserSupport.webSocket && browserSupport.mediaDevices ? 'text-green-400' : 'text-red-400'">
            {{ browserSupport.webSocket && browserSupport.mediaDevices ? '完全支持' : '部分支持' }}
          </span></div>
          <div v-if="!browserSupport.webSocket" class="text-red-400">⚠️ WebSocket不支持</div>
          <div v-if="!browserSupport.mediaDevices" class="text-red-400">⚠️ 麦克风API不支持</div>
          <div v-if="!isHttps" class="text-red-400">⚠️ 需要HTTPS环境</div>
          <div v-if="lastAgentInfo" class="text-green-400">
            ✅ 上次测试成功: {{ lastAgentInfo.agentName }}
          </div>
        </div>
      </div>

      <!-- 快速设置指南 -->
      <div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <h3 class="text-sm font-medium text-blue-400 mb-2">🚀 Conversational AI 设置指南</h3>
        <div class="space-y-1 text-xs text-gray-300">
          <div>1. 访问 <a href="https://elevenlabs.io/app/conversational-ai" target="_blank" class="text-blue-400 underline">ElevenLabs Conversational AI</a></div>
          <div>2. 创建新的 Conversational AI Agent</div>
          <div>3. 复制 Agent ID 到上方输入框</div>
          <div>4. 获取API密钥并测试连接</div>
          <div>5. 保存设置即可开始对话</div>
        </div>
      </div>

      <!-- 功能说明 -->
      <div class="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <h3 class="text-sm font-medium text-purple-400 mb-2">✨ Conversational AI 特性</h3>
        <div class="space-y-1 text-xs text-gray-300">
          <div>• 🗣️ 自然的语音对话，无需唤醒词</div>
          <div>• 🧠 上下文理解，连续对话</div>
          <div>• ⚡ 低延迟实时响应</div>
          <div>• 🎭 可自定义 Agent 人格和知识</div>
          <div>• 📝 自动记录对话历史</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import speechService from '../utils/speechService.js'

// 组件事件
const emit = defineEmits(['close', 'saved'])

// 响应式数据
const apiKey = ref('')
const showApiKey = ref(false)
const agentId = ref('')
const isTesting = ref(false)
const statusMessage = ref('')
const statusType = ref('')
const lastAgentInfo = ref(null)

// 浏览器支持检测
const browserSupport = ref({
  webSocket: typeof WebSocket !== 'undefined',
  mediaDevices: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
  audioContext: !!(window.AudioContext || window.webkitAudioContext)
})

// HTTPS检测
const isHttps = computed(() => {
  return location.protocol === 'https:' || location.hostname === 'localhost'
})

// 组件挂载时加载保存的设置
onMounted(() => {
  loadSettings()
})

// 加载保存的设置
const loadSettings = () => {
  // 首先尝试加载新的统一设置格式
  const unifiedSettings = localStorage.getItem('elevenLabsSettings')
  if (unifiedSettings) {
    try {
      const settings = JSON.parse(unifiedSettings)
      if (settings.apiKey) apiKey.value = settings.apiKey
      if (settings.agentId) agentId.value = settings.agentId
      // 向后兼容：如果有voiceId但没有agentId，则使用voiceId作为agentId
      if (!settings.agentId && settings.voiceId) {
        agentId.value = settings.voiceId
      }
      return
    } catch (error) {
      console.error('解析统一语音设置失败:', error)
    }
  }
  
  // 如果没有统一设置，则尝试加载旧格式（向后兼容）
  const savedApiKey = localStorage.getItem('elevenLabsApiKey')
  const savedVoice = localStorage.getItem('elevenLabsVoiceId')
  
  if (savedApiKey) {
    apiKey.value = savedApiKey
  }
  
  if (savedVoice) {
    agentId.value = savedVoice // 向后兼容，将voiceId作为agentId使用
  }
}

// 测试Agent功能
const testAgent = async () => {
  // 基础检查
  if (!apiKey.value) {
    showStatus('请先设置 ElevenLabs API 密钥', 'error')
    return
  }

  if (!agentId.value) {
    showStatus('请先设置 Agent ID', 'error')
    return
  }

  if (!isHttps.value) {
    showStatus('Conversational AI 需要HTTPS环境或localhost', 'error')
    return
  }

  if (!browserSupport.value.mediaDevices) {
    showStatus('浏览器不支持麦克风访问', 'error')
    return
  }

  isTesting.value = true
  statusMessage.value = '正在测试 Agent 连接...'

  try {
    // 设置API密钥和Agent配置
    speechService.setElevenLabsApiKey(apiKey.value)
    speechService.setAgentConfig(agentId.value)

    // 使用新的testConnection方法
    const result = await speechService.testConnection()
    
    if (result.success) {
      lastAgentInfo.value = result
      showStatus(`✅ ${result.message}！Agent: ${result.agentName}`, 'success')
      
      // 获取诊断信息
      const diagnostic = speechService.getDiagnosticInfo()
      console.log('🔧 Conversational AI 诊断信息:', diagnostic)
      
      if (diagnostic.recommendations.length > 0) {
        const recommendations = diagnostic.recommendations.join('\n')
        console.log('💡 建议:', recommendations)
      }
    } else {
      showStatus('❌ Agent 连接失败', 'error')
    }
  } catch (error) {
    console.error('Agent 测试失败:', error)
    showStatus(`❌ ${error.message}`, 'error')
    
    // 输出详细的诊断信息
    const diagnostic = speechService.getDiagnosticInfo()
    console.log('🔧 Conversational AI 诊断信息:', diagnostic)
    console.log('💡 解决建议:', diagnostic.recommendations.join('\n'))
  } finally {
    isTesting.value = false
  }
}

// 保存设置
const saveSettings = () => {
  // 保存到localStorage
  const settings = {
    apiKey: apiKey.value,
    agentId: agentId.value,
    // 向后兼容
    voiceId: agentId.value
  }
  
  localStorage.setItem('elevenLabsSettings', JSON.stringify(settings))
  
  // 更新speechService
  if (apiKey.value) {
    speechService.setElevenLabsApiKey(apiKey.value)
  }
  if (agentId.value) {
    speechService.setAgentConfig(agentId.value)
  }
  
  showStatus('✅ 设置已保存', 'success')
  
  setTimeout(() => {
    emit('saved', settings)
    emit('close')
  }, 1500)
}

// 显示状态消息
const showStatus = (message, type) => {
  statusMessage.value = message
  statusType.value = type
  
  if (type === 'success') {
    setTimeout(() => {
      statusMessage.value = ''
    }, 3000)
  }
}
</script>

<style scoped>
/* 自定义滑块样式 */
.voice-slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  cursor: pointer;
  border: 2px solid #1f2937;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
}

.voice-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.voice-slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  cursor: pointer;
  border: 2px solid #1f2937;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
}

/* 选择框样式 */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* 动画效果 */
.voice-settings-modal {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 玻璃形态效果 */
.voice-settings-modal > div {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
</style> 