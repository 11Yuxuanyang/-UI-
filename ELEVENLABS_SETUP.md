# ElevenLabs语音设置指南

## 概述

本应用已集成ElevenLabs流媒体API，提供高质量的实时语音合成功能。您可以通过配置API密钥来启用专业级的语音回复体验。

## 获取ElevenLabs API密钥

### 1. 注册ElevenLabs账户
1. 访问 [ElevenLabs官网](https://elevenlabs.io/)
2. 点击"Sign Up"注册新账户
3. 完成邮箱验证

### 2. 获取API密钥
1. 登录ElevenLabs控制台
2. 进入"Profile"页面
3. 找到"API Keys"部分
4. 点击"Create API Key"
5. 复制生成的API密钥

## 在应用中配置

### 方法一：通过语音设置界面
1. 在主页点击右上角"+"号
2. 选择"语音设置"
3. 在"ElevenLabs API 密钥"字段中粘贴您的密钥
4. 选择喜欢的语音角色
5. 调节语音参数（可选）
6. 点击"测试语音"验证配置
7. 点击"保存设置"

### 方法二：直接在代码中配置
```javascript
import speechService from './utils/speechService.js'

// 设置API密钥
speechService.setElevenLabsApiKey('your_api_key_here')

// 设置语音配置
speechService.setVoiceConfig('JBFqnCBsd6RMkjVDRZzb', 'eleven_multilingual_v2')
```

## 可用语音角色

应用预设了以下语音角色：

| 语音ID | 角色名称 | 语言 | 特点 |
|--------|----------|------|------|
| JBFqnCBsd6RMkjVDRZzb | George | 英语 | 深沉男声，适合正式场合 |
| pNInz6obpgDQGcFmaJgB | Adam | 英语 | 年轻男声，自然流畅 |
| TxGEqnHWrfWFTfGW9XjX | Josh | 英语 | 温和男声，友好亲切 |
| VR6AewLTigWG4xSOukaG | Arnold | 英语 | 低沉男声，权威感强 |
| EXAVITQu4vr4xnSDxMaL | Bella | 英语 | 优雅女声，专业感强 |
| ErXwobaYiN019PkySvjV | Antoni | 英语 | 活力男声，年轻动感 |
| MF3mGyEYCl7XYWbV9V6O | Elli | 英语 | 清澈女声，温暖亲切 |
| ThT5KcBeYPX3keUQqHPh | Charlie | 英语 | 成熟男声，稳重可靠 |

## 语音参数调节

### 稳定性 (Stability)
- **范围**: 0.0 - 1.0
- **默认**: 0.5
- **说明**: 控制语音的一致性，值越高语音越稳定

### 相似度增强 (Similarity Boost)
- **范围**: 0.0 - 1.0
- **默认**: 0.8
- **说明**: 增强语音与原始声音的相似度

### 风格 (Style)
- **范围**: 0.0 - 1.0
- **默认**: 0.0
- **说明**: 控制语音的表达风格和情感

## 使用限制

### 免费计划
- 每月10,000字符
- 基础语音质量
- 标准API访问

### 付费计划
- 更多字符配额
- 高级语音质量
- 优先API访问
- 自定义语音训练

## 故障排除

### API密钥无效
- 检查密钥是否正确复制
- 确认ElevenLabs账户状态正常
- 验证API密钥权限

### 语音播放失败
- 检查网络连接
- 确认浏览器支持音频播放
- 查看浏览器控制台错误信息

### 配额不足
- 检查ElevenLabs账户使用情况
- 考虑升级到付费计划
- 应用会自动降级到浏览器TTS

## 降级方案

当ElevenLabs API不可用时，应用会自动使用以下降级方案：

1. **Web Speech API**: 浏览器内置的语音合成
2. **模拟延迟**: 无语音支持时的静默播放

## 隐私和安全

- API密钥仅存储在本地浏览器
- 不会向第三方服务器发送密钥
- 语音数据通过HTTPS加密传输
- 支持随时删除本地存储的密钥

## 技术支持

如果您在配置过程中遇到问题：

1. 查看浏览器控制台错误信息
2. 确认网络连接正常
3. 验证ElevenLabs服务状态
4. 尝试使用不同的语音角色

## 最佳实践

1. **测试优先**: 配置完成后先进行语音测试
2. **参数调优**: 根据个人喜好调节语音参数
3. **网络监控**: 在网络不稳定时会自动降级
4. **配额管理**: 定期检查API使用情况

---

通过以上配置，您就可以享受高质量的AI语音助手体验了！ 