# 🏃‍♀️ HealthWatch 智能健康手环前端

一个现代化的智能健康手环前端应用，采用 Vue 3 + Vite 构建，提供完整的健康数据管理、智能助手对话、商城购物等功能。

## ✨ 项目特色

- 🎨 **现代化设计** - 采用玻璃形态(Glassmorphism)设计风格，视觉效果出众
- 📱 **移动端优先** - 完全响应式设计，专为移动设备优化
- 🤖 **AI 智能助手** - 内置健康助手，支持对话交互和健康建议
- 📸 **拍照识别** - 支持拍照记录饮食，AI分析卡路里和营养成分
- 📊 **数据可视化** - 丰富的健康数据图表展示
- 🛒 **电商功能** - 完整的健康产品商城体验
- ⚡ **流畅动效** - 精心设计的页面过渡和交互动画

## 🛠️ 技术栈

### 核心框架
- **Vue 3** - 采用 Composition API，响应式框架
- **Vite** - 极速构建工具，开发体验优秀
- **Vue Router** - 单页面应用路由管理

### 样式与UI
- **Tailwind CSS** - 实用优先的CSS框架
- **CSS3 动画** - 自定义动效和过渡效果
- **Glassmorphism** - 玻璃形态设计风格

### 功能特性
- **MediaDevices API** - 摄像头访问和拍照功能
- **Canvas API** - 图像处理和截图功能
- **LocalStorage** - 本地数据持久化

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```
访问 http://localhost:3000 (如果端口被占用会自动选择其他端口)

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
手环前端/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用组件
│   │   ├── ActivityCard.vue       # 活动数据卡片
│   │   ├── BottomNavBar.vue       # 底部导航栏
│   │   ├── ChatInput.vue          # 聊天输入框(含拍照功能)
│   │   ├── HeartRateCard.vue      # 心率数据卡片
│   │   ├── StabilityCard.vue      # 稳定性卡片
│   │   └── StressCard.vue         # 压力数据卡片
│   ├── router/             # 路由配置
│   │   └── index.js               # 路由定义
│   ├── views/              # 页面组件
│   │   ├── HomeView.vue           # 健康助手首页
│   │   ├── MallView.vue           # 商城页面
│   │   ├── DataView.vue           # 数据分析页面
│   │   ├── RecordsView.vue        # 记录页面
│   │   └── SettingsView.vue       # 设置页面
│   ├── App.vue             # 根组件
│   ├── main.js            # 应用入口
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tailwind.config.js     # Tailwind 配置
├── postcss.config.js      # PostCSS 配置
└── vite.config.js         # Vite 配置
```

## 🎯 主要功能模块

### 1. 健康助手 (HomeView)
- **智能对话** - 与AI健康助手进行对话交流
- **昨日报告** - 显示详细的健康数据报告
- **拍照识别** - 拍摄食物照片，AI分析卡路里
- **快捷菜单** - 扫一扫、添加设备、商城入口

### 2. 商城模块 (MallView)
- **产品展示** - 精选健康产品展示
- **分类筛选** - 多维度产品筛选
- **搜索功能** - 产品搜索和发现
- **购物车** - 完整的购物流程

### 3. 数据分析 (DataView)
- **实时监测** - 步数、心率等核心指标
- **趋势图表** - 周期性数据可视化
- **健康评估** - 综合健康状态分析
- **目标管理** - 个人健康目标设定

### 4. 记录管理 (RecordsView)
- **对话历史** - 与AI助手的聊天记录
- **健康总结** - AI生成的健康报告
- **数据导出** - 支持数据导出功能

## 🎨 设计系统

### 色彩方案
- **主色调** - 深色主题，突出健康科技感
- **强调色** - 蓝色(#3B82F6)、绿色(#10B981)、红色(#EF4444)
- **玻璃效果** - 半透明背景 + 背景模糊

### 组件样式
- **glassmorphism-card** - 统一的卡片样式类
- **响应式设计** - 移动端优先的布局
- **动画效果** - 平滑的过渡和悬停效果

## 📱 拍照功能使用指南

### 功能位置
聊天输入框右侧的相机图标

### 使用流程
1. 点击相机图标打开拍照界面
2. 授权摄像头访问权限
3. 对准食物进行拍摄
4. 预览照片，确认后保存
5. AI自动分析食物类型和卡路里

### 技术实现
```javascript
// 获取摄像头权限
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: 'environment', // 后置摄像头
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
})

// 拍照和图像处理
const canvas = canvasElement.value
const context = canvas.getContext('2d')
context.drawImage(video, 0, 0, canvas.width, canvas.height)
const imageData = canvas.toDataURL('image/jpeg', 0.8)
```

## 🔧 开发指南

### 添加新页面
1. 在 `src/views/` 创建新的 Vue 组件
2. 在 `src/router/index.js` 添加路由配置
3. 在 `BottomNavBar.vue` 添加导航项

### 自定义样式
- 使用 Tailwind CSS 工具类
- 自定义样式写在 `style.css` 中
- 组件级样式使用 `<style scoped>`

### 状态管理
- 目前使用组件内部状态管理
- 复杂状态可考虑引入 Pinia

## 📝 API 接口说明

目前项目使用模拟数据，生产环境需要对接以下API：

### 健康数据 API
- `GET /api/health/daily` - 获取日常健康数据
- `GET /api/health/trends` - 获取趋势数据
- `POST /api/health/food-analysis` - 食物图片分析

### 商城 API
- `GET /api/products` - 获取产品列表
- `GET /api/products/:id` - 获取产品详情
- `POST /api/cart/add` - 添加到购物车

### 用户 API
- `GET /api/user/profile` - 获取用户信息
- `POST /api/user/settings` - 更新用户设置

## 🔍 调试技巧

### 浏览器开发者工具
- 移动设备模拟：F12 → 设备工具栏
- 响应式测试：切换不同设备尺寸
- 性能分析：Lighthouse 检测

### 常见问题
1. **摄像头无法访问** - 检查浏览器权限设置
2. **样式异常** - 确认 Tailwind CSS 正确加载
3. **路由问题** - 检查路由配置和组件导入

## 🚢 部署指南

### 环境变量
创建 `.env.production` 文件：
```env
VITE_API_BASE_URL=https://api.healthwatch.com
VITE_APP_TITLE=HealthWatch
```

### 静态部署
```bash
npm run build
# 将 dist/ 目录上传到服务器
```

### Docker 部署
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 开启 Pull Request

## 📄 许可证

该项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 项目维护者：[Your Name]
- 邮箱：[your-email@example.com]
- 项目地址：[https://github.com/your-username/health-watch-frontend]

---

## 🔮 未来计划

- [ ] 集成真实的AI食物识别API
- [ ] 添加更多健康数据类型
- [ ] 支持多语言国际化
- [ ] 添加离线缓存功能
- [ ] 集成推送通知
- [ ] 添加数据同步功能

**开启nova之旅！** 🚀 