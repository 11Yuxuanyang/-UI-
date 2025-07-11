import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// Conversational AI 配置
const ELEVENLABS_CONVAI_WS_URL = "wss://api.elevenlabs.io/v1/convai/conversation";

class RealTimeConversationalAI {
  constructor() {
    // ElevenLabs Config
    this.elevenLabsApiKey = null
    this.agentId = null // 使用Agent ID而不是Voice ID
    this.elevenlabs = null
    
    // WebSocket for Conversational AI
    this.websocket = null
    this.conversationId = null

    // Web Audio
    this.audioContext = null
    this.analyser = null
    this.microphone = null
    this.processor = null

    // State Management
    this.isConnected = false
    this.isListening = false
    this.isSpeaking = false
    
    // Event Handlers
    this.onError = null
    this.onStatusChange = null
    this.onMessage = null

    // Audio Playback
    this.currentAudio = null
    this.audioQueue = []
    this.isPlaying = false

    // Conversation state
    this.conversationHistory = []
  }

  // === Public API ===

  setElevenLabsApiKey(apiKey) {
    this.elevenLabsApiKey = apiKey;
    if (apiKey) {
      try {
        this.elevenlabs = new ElevenLabsClient({ apiKey });
        console.log('ElevenLabsClient initialized for Conversational AI.');
      } catch (error) {
        console.error("Failed to initialize ElevenLabsClient:", error);
        this.elevenlabs = null;
      }
    } else {
      this.elevenlabs = null;
    }
  }

  setAgentConfig(agentId) {
    this.agentId = agentId;
    console.log('Agent ID 设置为:', agentId);
  }

  // 保持向后兼容
  setVoiceConfig(voiceId, modelId = 'eleven_multilingual_v2') {
    console.warn('setVoiceConfig 已弃用，请使用 setAgentConfig。自动将 voiceId 作为 agentId 使用。');
    this.setAgentConfig(voiceId);
  }

  async connect() {
    if (!this.elevenLabsApiKey) {
        if(this.onError) this.onError("ElevenLabs API Key is not set.");
        return;
    }
      
    if (!this.agentId) {
      if(this.onError) this.onError("Agent ID is not set.");
      return;
    }
      
    try {
      // 获取签名URL
      const signedUrl = await this.getSignedUrl();

      this.websocket = new WebSocket(signedUrl);
    await this.handleWebSocketConnection();
    } catch (error) {
      console.error('连接失败:', error);
      if (this.onError) this.onError(`连接失败: ${error.message}`);
    }
  }

  async startListening() {
    if (!this.isConnected || !this.websocket) {
      if (this.onError) this.onError('Connection not established.');
      return;
    }
    
    try {
      // 请求麦克风权限
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          sampleRate: 16000, // Conversational AI 推荐使用 16kHz
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.setupAudioContext(stream);
      this.isListening = true;
      
      if (this.onStatusChange) this.onStatusChange('listening');
      console.log('开始监听用户语音...');
      
    } catch (error) {
      console.error('Failed to start microphone:', error);
      if (this.onError) this.onError('Could not access microphone.');
    }
  }
  
  stopListening() {
    if (this.processor) {
      this.processor.disconnect();
    }
    if (this.microphone) {
      this.microphone.disconnect();
    }
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
    
    this.isListening = false;
    if (this.onStatusChange) this.onStatusChange('connected');
    console.log('停止监听用户语音.');
  }

  disconnect() {
    this.cleanup();

    // 安全地关闭WebSocket连接
    if (this.websocket) {
      if (this.websocket.readyState === WebSocket.OPEN || this.websocket.readyState === WebSocket.CONNECTING) {
      this.websocket.close();
      }
      // 清除事件监听器
      this.websocket.onopen = null;
      this.websocket.onclose = null;
      this.websocket.onerror = null;
      this.websocket.onmessage = null;
      this.websocket = null;
    }
    
    this.isConnected = false;
    if (this.onStatusChange) this.onStatusChange('disconnected');
  }

  cleanup() {
    this.stopListening();
    this.stopAudioPlayback();
    this.conversationHistory = [];
    this.conversationId = null;
    this.isSpeaking = false;
  }

  isReady() {
    return this.isConnected && this.websocket && this.websocket.readyState === WebSocket.OPEN;
  }

  // === Error Handlers ===
  setErrorHandler(handler) {
    this.onError = handler;
  }

  setStatusChangeHandler(handler) {
    this.onStatusChange = handler;
  }

  setMessageHandler(handler) {
    this.onMessage = handler;
  }

  // === 调试和诊断功能 ===
  getDiagnosticInfo() {
    const hasApiKey = !!this.elevenLabsApiKey;
    const hasAgentId = !!this.agentId;
    const isHttps = location.protocol === 'https:' || location.hostname === 'localhost';
    const hasWebSocket = typeof WebSocket !== 'undefined';
    const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasAudioContext = !!(window.AudioContext || window.webkitAudioContext);

    return {
      apiKey: hasApiKey ? '已设置' : '未设置',
      agentId: hasAgentId ? this.agentId : '未设置',
      conversationId: this.conversationId || '无',
      isConnected: this.isConnected,
      isListening: this.isListening,
      isSpeaking: this.isSpeaking,
      environment: {
        https: isHttps,
        webSocket: hasWebSocket,
        mediaDevices: hasMediaDevices,
        audioContext: hasAudioContext
      },
      audioSupport: this.checkAudioSupport(),
      conversationHistory: this.conversationHistory.length + ' 条消息',
      recommendations: this.getRecommendations(hasApiKey, hasAgentId, isHttps, hasWebSocket, hasMediaDevices)
    };
  }

  getRecommendations(hasApiKey, hasAgentId, isHttps, hasWebSocket, hasMediaDevices) {
    const recommendations = [];

    if (!hasApiKey) {
      recommendations.push('🔑 需要设置ElevenLabs API密钥');
    }

    if (!hasAgentId) {
      recommendations.push('🤖 需要设置Agent ID');
    }

    if (!isHttps) {
      recommendations.push('🔒 需要HTTPS环境或localhost');
    }

    if (!hasWebSocket) {
      recommendations.push('🌐 浏览器不支持WebSocket');
    }

    if (!hasMediaDevices) {
      recommendations.push('🎤 浏览器不支持麦克风访问');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ 环境配置正常，可以使用Conversational AI');
    } else {
      // 添加音频相关的建议
      recommendations.push('🔊 如果遇到音频播放问题，请尝试:');
      recommendations.push('   - 检查浏览器音频权限设置');
      recommendations.push('   - 尝试刷新页面重新连接');
      recommendations.push('   - 使用Chrome或Firefox浏览器获得最佳体验');
      recommendations.push('   - 确保网络连接稳定');
    }

    return recommendations;
  }

  // 测试连接函数
  async testConnection() {
    if (!this.elevenLabsApiKey) {
      throw new Error('API密钥未设置');
    }

    if (!this.agentId) {
      throw new Error('Agent ID未设置');
    }

    try {
      // 测试API密钥和Agent访问
      const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${this.agentId}`, {
        headers: {
          'xi-api-key': this.elevenLabsApiKey
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('API密钥无效或已过期');
        } else if (response.status === 403) {
          throw new Error('账户权限不足，无法访问Conversational AI');
        } else if (response.status === 404) {
          throw new Error('Agent ID不存在或无权访问');
        } else if (response.status === 429) {
          throw new Error('API调用频率超限');
        } else {
          throw new Error(`API错误: ${response.status}`);
        }
      }

      const agentInfo = await response.json();
      return {
        success: true,
        message: 'Conversational AI连接成功',
        agentName: agentInfo.name || 'Unknown Agent',
        agentId: this.agentId
      };

    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('网络连接失败，请检查网络设置');
      }
      throw error;
    }
  }

  // === 内部方法 ===

  async getSignedUrl() {
    if (!this.elevenLabsApiKey || !this.agentId) {
      throw new Error('API密钥或Agent ID未设置');
    }

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${this.agentId}`,
        {
          headers: {
            'xi-api-key': this.elevenLabsApiKey
          }
        }
      );

      if (!response.ok) {
        throw new Error(`获取签名URL失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.signed_url;
    } catch (error) {
      console.error('获取签名URL失败:', error);
      throw error;
    }
  }

  async handleWebSocketConnection() {
    return new Promise((resolve, reject) => {
      this.websocket.onopen = () => {
      console.log('已连接到 ElevenLabs Conversational AI');
        this.isConnected = true;
        if (this.onStatusChange) this.onStatusChange('connected');
      
      // 检查并记录音频支持情况
      this.checkAudioSupport();
      
        resolve();
      };
      
      this.websocket.onmessage = (event) => this.handleWebSocketMessage(event);
      
      this.websocket.onerror = (error) => {
        console.error('WebSocket Error:', error);
        if (this.onError) this.onError('连接错误');
        this.isConnected = false;
        reject(error);
      };

      this.websocket.onclose = (event) => {
        console.log('WebSocket连接已关闭:', event.code, event.reason);
        this.isConnected = false;
        this.isSpeaking = false;
        if (this.onStatusChange) this.onStatusChange('disconnected');
      };
    });
  }

  handleWebSocketMessage(event) {
    // 检查WebSocket状态，如果已关闭则不处理消息
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      console.log('WebSocket已关闭，忽略消息');
      return;
    }

    try {
      const message = JSON.parse(event.data);
      console.log('收到消息:', message);

      switch (message.type) {
        case 'conversation_initiation_metadata':
          this.conversationId = message.conversation_initiation_metadata_event.conversation_id;
          console.log('对话已初始化，ID:', this.conversationId);
          break;

        case 'agent_response':
          this.handleAgentResponse(message.agent_response_event);
          break;

        case 'user_transcript':
          this.handleUserTranscript(message.user_transcript_event);
          break;

        case 'audio':
          this.handleAudioResponse(message.audio_event);
          break;

        case 'interruption':
          this.handleInterruption(message.interruption_event);
          break;

        case 'ping':
          // 发送pong响应，但先检查WebSocket状态
          if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(JSON.stringify({ type: 'pong' }));
          }
          break;

        default:
          console.log('未处理的消息类型:', message.type);
      }

      // 触发消息回调
      if (this.onMessage) {
        this.onMessage(message);
      }

    } catch (error) {
      console.error('处理WebSocket消息失败:', error);
    }
  }

  handleAgentResponse(event) {
    console.log('Agent响应:', event.agent_response);
    this.conversationHistory.push({
      type: 'agent',
      content: event.agent_response,
      timestamp: new Date()
    });
  }

  handleUserTranscript(event) {
    console.log('用户转录:', event.user_transcript);
    this.conversationHistory.push({
      type: 'user',
      content: event.user_transcript,
      timestamp: new Date()
    });
  }

  handleAudioResponse(event) {
    if (event.audio_base_64) {
      console.log('收到音频响应，长度:', event.audio_base_64.length, '字符');
      this.playAudioFromBase64(event.audio_base_64);
    } else {
      console.warn('收到空的音频响应');
    }
  }

  handleInterruption(event) {
    console.log('对话被中断:', event);
    this.stopAudioPlayback();
    this.isSpeaking = false;
    if (this.onStatusChange) this.onStatusChange('listening');
  }

  setupAudioContext(stream) {
    // 创建兼容的AudioContext，支持不同采样率
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({ 
        sampleRate: 16000 
      });
    } catch (error) {
      // 如果指定采样率失败，使用默认设置
      console.warn('无法创建16kHz AudioContext，使用默认设置:', error);
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;

    this.microphone = this.audioContext.createMediaStreamSource(stream);
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (event) => {
      if (this.isListening && this.websocket?.readyState === WebSocket.OPEN) {
        const inputData = event.inputBuffer.getChannelData(0);
        
        // 转换为16kHz 16位PCM
        const pcmData = this.floatTo16BitPCM(inputData);
        let binary = '';
        const len = pcmData.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(pcmData[i]);
            }
        
        // 发送音频数据到Conversational AI
        this.websocket.send(JSON.stringify({
          type: 'audio',
          audio_event: {
            audio_base_64: btoa(binary)
        }
        }));
      }
    };

    this.microphone.connect(this.analyser);
    this.microphone.connect(this.processor);
    this.processor.connect(this.audioContext.destination);
  }

  floatTo16BitPCM(input) {
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return new Uint8Array(buffer);
  }

  playAudioFromBase64(base64Audio) {
    try {
      this.isSpeaking = true;
      if (this.onStatusChange) this.onStatusChange('speaking');

      // 停止当前播放的音频
      this.stopAudioPlayback();

      console.log('开始处理Base64音频数据，长度:', base64Audio.length);

      // 将Base64转换为二进制数据
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      console.log('音频数据转换完成，数组缓冲区大小:', arrayBuffer.byteLength);

      // 尝试多种音频格式，按优先级顺序
      const mimeTypes = [
        'audio/mpeg',     // MP3
        'audio/mp4',      // M4A/AAC
        'audio/wav',      // WAV
        'audio/ogg',      // OGG
        'audio/webm',     // WebM Audio
        'audio/*'         // 通用格式
      ];

      this.tryAudioFormats(arrayBuffer, mimeTypes, 0);

    } catch (error) {
      console.error('音频处理失败:', error);
      this.isSpeaking = false;
      if (this.onStatusChange) this.onStatusChange('listening');
    }
  }

  // 递归尝试不同的音频格式
  tryAudioFormats(arrayBuffer, mimeTypes, index) {
    if (index >= mimeTypes.length) {
      console.error('所有音频格式都尝试失败，使用文本提示');
      this.isSpeaking = false;
      if (this.onStatusChange) this.onStatusChange('listening');
      
      // 显示文本提示代替音频
      if (this.onMessage) {
        this.onMessage({
          type: 'audio_error',
          message: '音频播放失败，请检查网络连接或尝试刷新页面'
        });
      }
      return;
    }

    const mimeType = mimeTypes[index];
    console.log(`尝试格式 ${index + 1}/${mimeTypes.length}:`, mimeType);

    try {
      const audioBlob = new Blob([arrayBuffer], { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio();
      
      // 设置超时机制
      const loadTimeout = setTimeout(() => {
        console.log(`格式 ${mimeType} 加载超时，尝试下一个格式`);
        URL.revokeObjectURL(audioUrl);
        this.tryAudioFormats(arrayBuffer, mimeTypes, index + 1);
      }, 3000);

      audio.oncanplaythrough = () => {
        clearTimeout(loadTimeout);
        console.log(`格式 ${mimeType} 加载成功，开始播放`);
        
        this.currentAudio = audio;
        
        audio.onended = () => {
          console.log('AI响应播放完成');
          this.isSpeaking = false;
          if (this.onStatusChange) this.onStatusChange('listening');
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = (error) => {
          console.error(`格式 ${mimeType} 播放错误:`, error);
          URL.revokeObjectURL(audioUrl);
          this.tryAudioFormats(arrayBuffer, mimeTypes, index + 1);
        };

        audio.play().catch(error => {
          console.error(`格式 ${mimeType} 播放失败:`, error);
          URL.revokeObjectURL(audioUrl);
          this.tryAudioFormats(arrayBuffer, mimeTypes, index + 1);
        });
      };

      audio.onerror = () => {
        clearTimeout(loadTimeout);
        console.log(`格式 ${mimeType} 加载失败，尝试下一个格式`);
        URL.revokeObjectURL(audioUrl);
        this.tryAudioFormats(arrayBuffer, mimeTypes, index + 1);
      };

      audio.onabort = () => {
        clearTimeout(loadTimeout);
        console.log(`格式 ${mimeType} 加载中止，尝试下一个格式`);
        URL.revokeObjectURL(audioUrl);
        this.tryAudioFormats(arrayBuffer, mimeTypes, index + 1);
      };

      // 开始加载
      audio.src = audioUrl;
      audio.load();

    } catch (error) {
      console.error(`创建格式 ${mimeType} 失败:`, error);
      this.tryAudioFormats(arrayBuffer, mimeTypes, index + 1);
    }
  }



  // 检查浏览器音频支持
  checkAudioSupport() {
    const audio = new Audio();
    const supportedFormats = [];
    
    const formats = {
      'audio/mpeg': ['.mp3'],
      'audio/mp4': ['.m4a', '.aac'],
      'audio/ogg': ['.ogg'],
      'audio/wav': ['.wav'],
      'audio/webm': ['.webm']
    };

    for (const [mimeType, extensions] of Object.entries(formats)) {
      if (audio.canPlayType(mimeType) !== '') {
        supportedFormats.push({ mimeType, support: audio.canPlayType(mimeType), extensions });
      }
    }

    console.log('浏览器支持的音频格式:', supportedFormats);
    return supportedFormats;
  }

  stopAudioPlayback() {
    if (this.currentAudio) {
      try {
        // 检查是HTML5 Audio元素还是AudioContext源
        if (this.currentAudio instanceof Audio) {
          // HTML5 Audio元素
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
          this.currentAudio.src = '';
        } else if (this.currentAudio.stop) {
          // AudioContext BufferSource
          this.currentAudio.stop();
        }
      } catch (error) {
        console.log('停止音频播放:', error.message);
      }
      this.currentAudio = null;
    }
    this.audioQueue = [];
    this.isPlaying = false;
  }

  // 获取对话历史
  getConversationHistory() {
    return this.conversationHistory;
  }

  // 清除对话历史
  clearConversationHistory() {
    this.conversationHistory = [];
  }

  // 获取音频数据（用于可视化）
  getAudioData() {
    if (this.analyser && this.isListening) {
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      return dataArray;
    }
    // 返回模拟数据用于可视化
    return new Uint8Array(32).fill(0);
  }
}

export default new RealTimeConversationalAI(); 