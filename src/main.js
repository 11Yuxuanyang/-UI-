import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 应用启动时清除所有登录状态，确保每次刷新都回到登录页面
sessionStorage.removeItem('tempLoginStatus')
localStorage.removeItem('userToken') // 清除可能存在的其他登录信息
localStorage.removeItem('loginStatus')

createApp(App).use(router).mount('#app') 