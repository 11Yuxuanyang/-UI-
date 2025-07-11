# 🤖 ElevenLabs Conversational AI 设置指南

HealthWatch 现已升级支持 ElevenLabs 的 Conversational AI 功能！这将为您提供更自然、更智能的语音对话体验。

## ✨ 新功能特性

- 🗣️ **自然对话**: 无需唤醒词，直接开始对话
- 🧠 **上下文理解**: AI 能记住之前的对话内容
- ⚡ **低延迟**: 实时响应，流畅对话
- 🎭 **可自定义**: 设置 Agent 的人格和专业知识
- 📝 **对话记录**: 自动保存对话历史

## 🚀 快速开始

### 步骤 1: 获取 ElevenLabs 账户
1. 访问 [ElevenLabs](https://elevenlabs.io/) 注册账户
2. 选择合适的订阅计划（Conversational AI 需要付费计划）

### 步骤 2: 创建 Conversational AI Agent
1. 登录后访问 [Conversational AI 控制台](https://elevenlabs.io/app/conversational-ai)
2. 点击 "Create Agent" 创建新的 Agent
3. 配置 Agent 设置：

#### 基本设置
- **Agent 名称**: 为您的健康助手命名（如 "HealthWatch Assistant"）
- **描述**: 简要描述 Agent 的功能

#### 人格设置 (Personality)
推荐配置健康助手人格：
```
你是 HealthWatch 的专业健康助手。你友善、专业且关心用户的健康状况。
你能够：
- 解答健康相关问题
- 分析用户的健康数据
- 提供健康建议和提醒
- 帮助用户制定健康计划

请始终以温和、关怀的语气与用户交流，但也要强调重要健康问题需要咨询专业医生。
```

#### 知识库设置 (Knowledge Base)
您可以添加相关的健康知识文档：
- 常见健康问题解答
- 运动指导文档
- 营养知识手册
- 设备使用说明

#### 语音设置
- **语音选择**: 选择合适的语音（建议选择清晰友好的声音）
- **语速**: 推荐中等语速
- **语调**: 友善、专业

### 步骤 3: 获取配置信息
1. Agent 创建完成后，复制 **Agent ID**
2. 在账户设置中获取 **API Key**

### 步骤 4: 在 HealthWatch 中配置
1. 点击悬浮球进入 Agent 界面
2. 点击右上角齿轮图标 ⚙️ 打开设置
3. 输入您的 API Key 和 Agent ID
4. 点击 "测试 Agent" 验证配置
5. 保存设置

## 🔧 高级配置

### Agent 训练优化

#### 1. 健康数据集成
配置 Agent 能够理解以下健康数据：
- 心率数据
- 步数统计
- 睡眠质量
- 血压记录
- 体重变化

#### 2. 个性化设置
根据用户画像调整：
- 年龄群体
- 健康目标
- 运动习惯
- 饮食偏好

#### 3. 安全设置
重要的健康安全提醒：
```
对于以下情况，请提醒用户立即寻求专业医疗帮助：
- 胸痛或呼吸困难
- 严重头痛或眩晕
- 异常心率变化
- 持续高血压
- 任何急性症状

始终强调：AI 助手不能替代专业医疗诊断。
```

## 🎯 使用最佳实践

### 1. 对话开始
- 简单问候："你好，我今天感觉有点累"
- 直接询问："我的心率数据怎么样？"
- 寻求建议："能给我一些运动建议吗？"

### 2. 有效沟通
- 使用清晰、简洁的语言
- 一次询问一个主题
- 提供具体的症状或数据

### 3. 数据分享
- 告诉 Agent 您的健康目标
- 分享相关的健康变化
- 描述当前的感受和状态

## 🐛 故障排除

### 常见问题

#### 1. Agent 无法连接
**症状**: 显示连接错误
**解决方案**:
```bash
# 在浏览器控制台检查
debugHealthWatch.diagnoseConversationalAI()
```
检查：
- API Key 是否正确
- Agent ID 是否有效
- 网络连接状态
- HTTPS 环境要求

#### 2. 麦克风无法访问
**症状**: 无法开始语音对话
**解决方案**:
- 检查浏览器麦克风权限
- 确认使用 HTTPS 或 localhost
- 重新授权麦克风访问

#### 3. 对话响应慢
**症状**: AI 响应延迟较长
**解决方案**:
- 检查网络连接质量
- 确认 ElevenLabs 服务状态
- 尝试重新连接

#### 4. Agent 回答不准确
**症状**: AI 回答与健康主题无关
**解决方案**:
- 重新训练 Agent 的人格设置
- 添加更多健康相关的知识库
- 调整 Agent 的指令和上下文

### 调试命令

打开浏览器控制台 (F12)，使用以下命令：

```javascript
// 完整诊断
debugHealthWatch.diagnoseConversationalAI()

// 测试 API 连接
debugHealthWatch.testAPI("your_api_key_here")

// 查看对话历史
debugHealthWatch.getConversationHistory()

// 清除对话历史
debugHealthWatch.clearConversationHistory()

// 获取完整状态
debugHealthWatch.getFullStatus()

// 清理服务
debugHealthWatch.cleanup()
```

## 💰 费用说明

### ElevenLabs 定价
- **免费计划**: 不支持 Conversational AI
- **Starter 计划**: 支持基础 Conversational AI 功能
- **Creator 计划**: 完整功能，推荐用于正式使用
- **Pro 计划**: 高级功能和更高使用限额

### 使用建议
- 开发测试阶段：使用 Starter 计划
- 正式部署：推荐 Creator 或 Pro 计划
- 监控使用量避免超出限额

## 🔐 安全注意事项

### 1. API Key 保护
- ⚠️ 永远不要在客户端代码中硬编码 API Key
- 🔑 API Key 只在浏览器本地存储，不会上传到服务器
- 🚫 不要分享您的 API Key

### 2. 数据隐私
- 📝 对话记录仅保存在本地浏览器
- 🔒 敏感健康信息不会发送到第三方
- 🛡️ 遵循健康数据保护规范

### 3. 医疗免责
- ⚠️ AI 助手不能替代专业医疗诊断
- 🏥 紧急情况请立即就医
- 👨‍⚕️ 重要健康决策请咨询医生

## 📞 技术支持

### HealthWatch 支持
- GitHub Issues: [项目地址](https://github.com/your-repo)
- 邮箱: support@healthwatch.com

### ElevenLabs 支持
- 官方文档: [ElevenLabs Docs](https://elevenlabs.io/docs)
- 社区论坛: [ElevenLabs Community](https://elevenlabs.io/community)
- 技术支持: support@elevenlabs.io

---

🎉 **开始您的 Conversational AI 健康助手之旅吧！**

享受更自然、更智能的健康管理体验！ 