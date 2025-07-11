<template>
  <!-- Mall Content -->
  <div class="relative w-full h-full bg-gray-900 overflow-y-auto">
    <!-- Mall Header -->
    <div class="sticky top-0 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 z-10">
      <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-3">
            <button @click="goBack" class="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-white">HealthStore</h1>
              <p class="text-xs text-gray-400">为您的健康而设计</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="showMallSearch = !showMallSearch" 
                    class="w-10 h-10 rounded-full bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center transition-all duration-300">
              <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
            <button class="w-10 h-10 rounded-full bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center transition-all duration-300 relative">
              <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <div class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-xs font-bold">3</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Search Bar -->
        <transition name="search-slide">
          <div v-if="showMallSearch" class="px-6 pb-4">
            <div class="relative">
              <input 
                type="text" 
                placeholder="搜索产品..." 
                class="w-full bg-gray-800/60 text-white placeholder-gray-400 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                v-model="mallSearchQuery"
              >
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </transition>
      </div>

      <!-- Mall Body -->
      <div class="text-white">
        <!-- Hero Section -->
        <div class="px-6 py-6">
          <div class="bg-gradient-to-br from-blue-600/40 via-purple-600/30 to-pink-600/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">限时优惠</span>
                <h2 class="text-2xl font-bold mb-2">健康科技 智慧生活</h2>
                <p class="text-white/80 text-sm mb-4">全新一代智能健康设备，享受8折特惠价格</p>
                <button class="bg-white text-gray-900 px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-colors">
                  立即选购
                </button>
              </div>
              <div class="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center ml-4">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="px-6 mb-6">
          <div class="flex space-x-3 overflow-x-auto pb-2">
            <button 
              v-for="category in mallCategories" 
              :key="category.id"
              @click="selectedMallCategory = category.id"
              :class="[
                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                selectedMallCategory === category.id 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/60'
              ]"
            >
              <span class="mr-2">{{ category.icon }}</span>
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Featured Products -->
        <div class="px-6 mb-8">
          <h3 class="text-lg font-semibold mb-4">精选产品</h3>
          <div class="grid grid-cols-1 gap-4">
            <div 
              v-for="product in mallFeaturedProducts" 
              :key="product.id"
              class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div class="flex items-start space-x-4">
                <div class="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="product.icon"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h4 class="font-semibold text-white mb-1">{{ product.name }}</h4>
                      <p class="text-xs text-gray-400 leading-relaxed">{{ product.description }}</p>
                    </div>
                    <span v-if="product.badge" 
                          :class="[
                            'px-2 py-1 rounded-full text-xs font-bold',
                            product.badge === 'NEW' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                          ]">
                      {{ product.badge }}
                    </span>
                  </div>
                  
                  <div class="flex items-center space-x-2 mb-3">
                    <div class="flex text-yellow-400">
                      <svg v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= product.rating ? 'fill-current' : 'text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <span class="text-xs text-gray-400">({{ product.reviews }})</span>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="text-lg font-bold text-white">¥{{ product.price }}</span>
                      <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">¥{{ product.originalPrice }}</span>
                      <span v-if="product.discount" class="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                        {{ product.discount }}
                      </span>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                      加入购物车
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="px-6 mb-8">
          <h3 class="text-lg font-semibold mb-4">周边</h3>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="product in mallGridProducts" 
              :key="product.id"
              class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div class="aspect-square bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl mb-3 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="product.icon"/>
                </svg>
              </div>
              <h4 class="font-medium text-white text-sm mb-1">{{ product.name }}</h4>
              <p class="text-xs text-gray-400 mb-3 line-clamp-2">{{ product.description }}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-blue-400 text-sm">¥{{ product.price }}</span>
                <button class="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12m6-6H6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Services -->
        <div class="px-6 pb-8">
          <h3 class="text-lg font-semibold mb-4">增值服务</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="service in mallServices" :key="service.id" 
                 class="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 text-center">
              <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3', service.bgColor]">
                <svg class="w-6 h-6" :class="service.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"/>
                </svg>
              </div>
              <h4 class="font-medium text-white text-sm mb-1">{{ service.name }}</h4>
              <p class="text-xs text-gray-400">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const showMallSearch = ref(false);
const mallSearchQuery = ref('');
const selectedMallCategory = ref('all');

const goBack = () => {
  router.back();
};

// 商城相关数据
const mallCategories = ref([
  { id: 'all', name: '全部', icon: '🏪' },
  { id: 'devices', name: '智能设备', icon: '⌚' },
  { id: 'health', name: '健康用品', icon: '💊' },
  { id: 'fitness', name: '运动器械', icon: '🏋️' },
  { id: 'nutrition', name: '营养补充', icon: '🥗' }
]);

const mallFeaturedProducts = ref([
  {
    id: 1,
    name: 'HealthWatch Pro',
    description: '第三代智能健康手环，支持心率、血氧、睡眠监测，电池续航7天',
    price: 599,
    originalPrice: 799,
    discount: '-25%',
    rating: 5,
    reviews: '2.1k',
    badge: 'NEW',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 2,
    name: '智能体重秤',
    description: '精准测量体重、BMI、肌肉量等13项身体数据，支持APP数据同步',
    price: 199,
    rating: 4,
    reviews: '856',
    badge: 'HOT',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  }
]);

const mallGridProducts = ref([
  {
    id: 3,
    name: '蛋白粉',
    description: '高品质乳清蛋白粉，健身必备营养补充',
    price: 158,
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
  },
  {
    id: 4,
    name: '瑜伽垫',
    description: '防滑环保瑜伽垫，适合各种运动',
    price: 89,
    icon: 'M4 6h16M4 12h16M4 18h16'
  },
  {
    id: 5,
    name: '维生素C',
    description: '天然维生素C片，增强免疫力',
    price: 45,
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
  },
  {
    id: 6,
    name: '哑铃套装',
    description: '可调节重量哑铃，家庭健身首选',
    price: 299,
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  }
]);

const mallServices = ref([
  {
    id: 1,
    name: '健康咨询',
    description: '专业医师在线咨询',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    bgColor: 'bg-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    id: 2,
    name: '营养规划',
    description: '个性化营养方案定制',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    bgColor: 'bg-green-500/20',
    iconColor: 'text-green-400'
  },
  {
    id: 3,
    name: '运动指导',
    description: '专业私教在线指导',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    bgColor: 'bg-orange-500/20',
    iconColor: 'text-orange-400'
  },
  {
    id: 4,
    name: '设备维护',
    description: '智能设备售后服务',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    bgColor: 'bg-purple-500/20',
    iconColor: 'text-purple-400'
  }
]);
</script>

<style scoped>
.search-slide-enter-active,
.search-slide-leave-active {
  transition: all 0.3s ease;
}

.search-slide-enter-from,
.search-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 