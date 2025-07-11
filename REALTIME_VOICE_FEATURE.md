# 实时语音通话功能实现文档

## 功能概述

将原有的录音后处理模式升级为实时语音通话模式，用户可以直接与AI助手进行连续的语音对话，就像真正的语音助手一样。现已集成ElevenLabs流媒体API，提供高质量的实时语音合成功能。

## 核心特性

### 🎯 实时交互
- **即时对话**：点击浮动球开始实时语音连接，无需录音后等待处理
- **连续对话**：支持多轮连续语音交互，AI可以主动提供健康建议
- **实时反馈**：语音识别结果实时显示，AI回复即时播放

### 🔗 WebSocket连接
- **实时通信**：使用WebSocket建立持久连接，支持双向实时数据传输
- **自动重连**：连接断开时自动重连（最多3次尝试）
- **状态管理**：完整的连接状态管理（连接中、监听中、说话中、错误等）

### 🎙️ 音频处理
- **实时音频流**：使用Web Audio API实现实时音频捕获和处理
- **音频可视化**：实时显示音频频谱波形，提供视觉反馈
- **格式转换**：Float32到16位PCM格式转换，确保API兼容性

### 🎨 用户界面
- **状态指示器**：动态显示连接状态（黄色连接中、绿色监听、蓝色回复、红色错误）
- **实时文本显示**：显示用户语音识别结果和AI回复文本
- **音频波形**：监听状态下显示实时音频波形动画
- **浮动球增强**：根据语音状态调整颜色、缩放和呼吸频率
- **语音设置界面**：可配置ElevenLabs API密钥、选择语音角色、调节语音参数

### 🔊 ElevenLabs集成
- **高质量TTS**：使用ElevenLabs先进的语音合成技术
- **流媒体播放**：支持实时流式音频播放，降低延迟
- **多种语音**：提供多个预设语音角色选择
- **参数调节**：可调节稳定性、相似度增强、风格等参数
- **智能降级**：API不可用时自动降级到浏览器内置TTS

## 技术实现

### 语音服务架构 (`src/utils/speechService.js`)

```javascript
class RealTimeSpeechService {
  // WebSocket连接管理
  initRealTimeConnection()
  handleWebSocketMessage(data)
  
  // 实时音频处理
  startListening()
  stopListening()
  floatTo16BitPCM(input)
  
  // 音频可视化
  getAudioData()
  updateAudioVisualization()
  
  // 资源管理
  cleanup()
  isReady()
}
```

### UI状态管理 (`src/App.vue`)

```javascript
// 实时语音状态
const isRealTimeCallActive = ref(false)
const callStatus = ref('idle') // idle, connecting, listening, speaking, error
const currentUserSpeech = ref('')
const currentAIResponse = ref('')
const audioVisualization = ref([])

// 事件处理
const handleSphereClick = async () => {
  if (isRealTimeCallActive.value) {
    await endRealTimeCall()
  } else {
    await startRealTimeCall()
  }
}
```

### API集成

#### WebSocket连接 (模拟实现)
```javascript
// 认证信息
{
  type: 'auth',
  api_key: this.apiKey,
  model: 'realtime-voice',
  config: {
    input_audio_format: 'pcm16',
    output_audio_format: 'pcm16',
    voice: 'female',
    language: 'zh',
    sample_rate: 16000
  }
}

// 音频数据传输
{
  type: 'audio_input',
  audio_data: Array.from(pcmData)
}
```

#### 实时消息处理
- `auth_success`: 认证成功
- `transcript`: 实时语音识别结果
- `response`: AI文本回复
- `audio`: AI语音回复
- `error`: 错误信息

## 用户体验

### 交互流程
1. **点击浮动球** → 开始建立实时连接
2. **连接成功** → 进入监听状态，可以开始说话
3. **实时识别** → 用户语音实时转换为文本显示
4. **AI回复** → AI生成回复并语音播放
5. **连续对话** → 保持连接，支持多轮对话
6. **再次点击** → 结束通话，清理资源

### 视觉反馈
- **连接中**: 黄色脉冲动画 + 旋转加载图标
- **监听中**: 绿色脉冲 + 麦克风图标 + 音频波形
- **AI回复**: 蓝色脉冲 + 扬声器图标
- **错误状态**: 红色脉冲 + 警告图标

### 音频反馈
- **点击音效**: 按钮点击时播放音效
- **触觉反馈**: 支持设备震动反馈
- **语音播放**: AI回复自动语音播放

## 错误处理

### 连接错误
- **网络问题**: 自动重连机制
- **权限拒绝**: 友好的错误提示
- **API限制**: 降级到模拟模式

### 音频错误
- **麦克风访问**: 清晰的权限说明
- **音频格式**: 自动格式转换
- **播放失败**: 静默处理，继续监听

### 资源管理
- **内存清理**: 及时释放音频资源
- **连接清理**: 应用关闭时自动断开
- **定时器清理**: 避免内存泄漏

## 模拟模式

当真实API不可用时，系统会自动启用模拟模式：

### 模拟功能
- **连接建立**: 模拟1秒连接延迟
- **AI回复**: 预设健康建议回复库
- **主动提醒**: 每30秒模拟AI主动健康建议
- **状态切换**: 完整的状态转换模拟

### 回复内容
- 健康数据分析建议
- 运动和饮食指导
- 睡眠质量改善建议
- 定期健康提醒

## 性能优化

### 音频处理
- **缓冲区管理**: 4096字节音频缓冲区
- **实时传输**: 最小延迟的音频流传输
- **格式优化**: 高效的PCM格式转换

### UI性能
- **动画优化**: 使用requestAnimationFrame
- **状态缓存**: 避免不必要的重新渲染
- **资源复用**: 音频上下文复用

### 网络优化
- **WebSocket**: 长连接减少握手开销
- **数据压缩**: 音频数据有效传输
- **错误恢复**: 智能重连策略

## 未来扩展

### API集成
- 集成真实的语音识别API
- 支持多种语音合成声音
- 添加情感识别功能

### 功能增强
- 语音指令识别
- 多语言支持
- 离线语音功能

### 健康功能
- 健康数据语音查询
- 个性化健康建议
- 语音健康评估

## 使用说明

1. **启动对话**: 点击主页面的浮动球
2. **等待连接**: 看到黄色连接动画
3. **开始说话**: 连接成功后直接说话
4. **查看反馈**: 观察实时文本和AI回复
5. **结束对话**: 再次点击浮动球结束

## 技术要求

- **浏览器**: 支持WebRTC和Web Audio API
- **权限**: 麦克风访问权限
- **网络**: 稳定的网络连接
- **设备**: 具备麦克风和扬声器的设备 