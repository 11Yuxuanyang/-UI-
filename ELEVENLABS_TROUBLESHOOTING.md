# 🔧 ElevenLabs API 故障排除指南

## 🚨 常见问题及解决方案

### 1. API密钥问题

#### 问题：API密钥无效或连接失败
**解决步骤：**
1. **获取正确的API密钥**
   - 访问 [ElevenLabs官网](https://elevenlabs.io/)
   - 注册/登录账户
   - 进入 Profile → API Keys
   - 创建新的API密钥或复制现有密钥

2. **验证API密钥格式**
   - 正确格式通常是：`sk-...` 开头的长字符串
   - 确保复制时没有多余空格或换行

3. **检查账户状态**
   - 确认ElevenLabs账户处于活跃状态
   - 检查是否有未支付的费用
   - 查看API配额是否已用完

### 2. 环境要求问题

#### 问题：浏览器环境不支持
**检查清单：**

- ✅ **HTTPS要求**
  ```
  语音功能需要HTTPS环境或localhost
  
  ✓ 生产环境：必须使用HTTPS
  ✓ 开发环境：可以使用localhost
  ❌ HTTP环境：不支持麦克风访问
  ```

- ✅ **浏览器支持**
  ```
  推荐浏览器版本：
  - Chrome 88+
  - Firefox 84+
  - Safari 14+
  - Edge 88+
  ```

- ✅ **权限设置**
  ```
  需要授权的权限：
  1. 麦克风访问权限
  2. 媒体设备权限
  3. WebSocket连接权限
  ```

### 3. 网络连接问题

#### 问题：WebSocket连接失败
**解决方案：**

1. **检查网络连接**
   ```bash
   # 测试网络连接
   ping api.elevenlabs.io
   ```

2. **防火墙/代理设置**
   ```
   需要允许的连接：
   - wss://api.elevenlabs.io
   - https://api.elevenlabs.io
   - 端口：443 (HTTPS/WSS)
   ```

3. **CDN/DNS问题**
   ```
   尝试切换DNS服务器：
   - Google DNS: 8.8.8.8
   - Cloudflare DNS: 1.1.1.1
   ```

### 4. 实时排查步骤

#### 第一步：检查浏览器控制台
```javascript
// 打开浏览器开发者工具 (F12)
// 查看Console标签页中的错误信息

// 常见错误及含义：
console.error('WebSocket Error'); // WebSocket连接失败
console.error('401 Unauthorized'); // API密钥无效
console.error('403 Forbidden'); // 账户权限不足
console.error('429 Too Many Requests'); // API调用频率超限
```

#### 第二步：使用内置调试工具
1. 在Agent页面点击右上角"+"号
2. 选择"语音设置"
3. 查看"调试信息"部分
4. 按照提示解决相应问题

#### 第三步：测试API连接
```javascript
// 在语音设置页面点击"测试语音"按钮
// 观察返回的状态信息：

✅ "API连接成功！语音功能可用" - 一切正常
❌ "API密钥无效或已过期" - 检查API密钥
❌ "网络连接失败，请检查网络" - 检查网络设置
❌ "浏览器不支持麦克风访问" - 更换浏览器或升级版本
```

### 5. 配置验证清单

#### ✅ 完整配置检查
```
□ ElevenLabs API密钥已设置
□ 语音ID已选择（默认：George）
□ 浏览器支持检测通过
□ HTTPS环境或localhost
□ 麦克风权限已授权
□ 网络连接正常
□ API测试成功
```

#### ✅ 存储设置检查
```javascript
// 检查localStorage中的设置
const settings = localStorage.getItem('elevenLabsSettings');
console.log('保存的设置:', JSON.parse(settings));

// 应该包含：
{
  "apiKey": "sk-...",
  "voiceId": "JBFqnCBsd6RMkjVDRZzb",
  "voiceSettings": {
    "stability": 0.5,
    "similarity_boost": 0.8,
    "style": 0.0
  }
}
```

### 6. 降级方案

#### 当ElevenLabs API不可用时
应用会自动使用以下降级方案：

1. **Web Speech API（浏览器内置）**
   ```javascript
   // 自动检测并切换到浏览器TTS
   if (window.speechSynthesis) {
     // 使用浏览器语音合成
   }
   ```

2. **静默模式**
   ```javascript
   // 如果语音完全不可用
   // 显示文字回复，不播放声音
   ```

### 7. 开发者调试

#### 启用详细日志
```javascript
// 在浏览器控制台中启用详细日志
localStorage.setItem('debug_speech_service', 'true');

// 重新加载页面查看详细日志
// 完成调试后记得关闭
localStorage.removeItem('debug_speech_service');
```

#### 手动测试API连接
```javascript
// 在浏览器控制台中手动测试
const testConnection = async () => {
  const apiKey = 'your_api_key_here';
  const response = await fetch('https://api.elevenlabs.io/v1/voices', {
    headers: {
      'xi-api-key': apiKey
    }
  });
  console.log('API测试结果:', response.status, await response.json());
};

testConnection();
```

### 8. 常见错误代码

| 错误代码 | 含义 | 解决方法 |
|---------|------|----------|
| 401 | API密钥无效 | 检查并更新API密钥 |
| 403 | 权限不足 | 验证账户状态和权限 |
| 422 | 请求参数错误 | 检查语音ID和设置 |
| 429 | 请求频率超限 | 等待或升级账户计划 |
| 500 | 服务器错误 | 稍后重试或联系支持 |

### 9. 联系支持

如果以上步骤都无法解决问题：

1. **收集信息**
   ```
   - 浏览器类型和版本
   - 操作系统版本
   - 错误信息截图
   - 控制台日志
   ```

2. **ElevenLabs官方支持**
   - 访问：https://elevenlabs.io/support
   - 邮箱：support@elevenlabs.io

3. **项目相关问题**
   - 在项目GitHub仓库创建Issue
   - 提供完整的错误信息和环境详情

---

## 🎯 快速解决方案

### 最常见的3个问题：

1. **API密钥未设置** → 进入语音设置，输入有效的API密钥
2. **HTTP环境** → 使用HTTPS或localhost
3. **麦克风权限** → 在浏览器中授权麦克风访问

### 快速验证：
1. 点击Agent页面的悬浮球
2. 如果出现语音通话界面 → ✅ 集成成功
3. 如果没有反应或报错 → 按本指南排查

记住：**大部分问题都是配置问题，而不是代码问题**！ 