import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import ExploreView from '../views/ExploreView.vue';
import HomeView from '../views/HomeView.vue';
import MallView from '../views/MallView.vue';
import CustomizationView from '../views/CustomizationView.vue';
import DataView from '../views/DataView.vue';
import RecordsView from '../views/RecordsView.vue';
import SettingsView from '../views/SettingsView.vue';
import HealthSummaryDetailView from '../views/HealthSummaryDetailView.vue';
import CollectionsView from '../views/CollectionsView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import PointsView from '../views/PointsView.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: ExploreView,
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/mall',
    name: 'Mall',
    component: MallView,
  },
  {
    path: '/customization',
    name: 'Customization',
    component: CustomizationView,
  },
  {
    path: '/data',
    name: 'Data',
    component: DataView,
  },
  {
    path: '/records',
    name: 'Records',
    component: RecordsView,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
  },
  {
    path: '/health-summary',
    name: 'HealthSummary',
    component: HealthSummaryDetailView,
  },
  {
    path: '/collections',
    name: 'Collections',
    component: CollectionsView,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: ScheduleView,
  },
  {
    path: '/points',
    name: 'Points',
    component: PointsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫 - 控制页面访问权限
router.beforeEach((to, from, next) => {
  // 检查是否有临时登录状态（仅在当前会话有效）
  const isLoggedIn = sessionStorage.getItem('tempLoginStatus') === 'true';
  
  // 允许访问的非登录页面
  const publicPages = ['/', '/explore'];
  const isPublicPage = publicPages.includes(to.path);
  
  // 如果访问的是需要登录的页面且没有登录状态，则重定向到登录页面
  if (!isPublicPage && !isLoggedIn) {
    // 清除任何可能残留的登录信息
    sessionStorage.clear();
    localStorage.removeItem('userToken');
    localStorage.removeItem('loginStatus');
    
    next('/');
  } else {
    next();
  }
});

// 页面刷新时清除登录状态
window.addEventListener('beforeunload', () => {
  // 清除临时登录状态，确保刷新后需要重新登录
  sessionStorage.removeItem('tempLoginStatus');
});

// 页面可见性变化时的额外检查（可选 - 更严格的安全控制）
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // 当页面隐藏时（如切换标签页），设置一个标记
    sessionStorage.setItem('pageWasHidden', 'true');
  } else if (document.visibilityState === 'visible') {
    // 当页面重新可见时，检查是否之前被隐藏过
    const wasHidden = sessionStorage.getItem('pageWasHidden');
    if (wasHidden === 'true') {
      // 如果页面之前被隐藏过，清除登录状态（可选的严格模式）
      // sessionStorage.removeItem('tempLoginStatus');
      sessionStorage.removeItem('pageWasHidden');
    }
  }
});

export default router; 