<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.15),transparent_50%)]"></div>
    </div>

    <!-- Header -->
    <div class="relative z-10 flex items-center justify-between p-6">
      <button @click="goBack" class="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <button @click="completeCustomization" 
              class="px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 border border-white/30">
        完成
      </button>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col" style="height: calc(100vh - 80px);">
      <!-- Product Display -->
      <div class="flex items-center justify-center px-6 py-2" style="height: 55%;">
        <!-- Watch Preview -->
        <div class="relative flex items-center justify-center h-full w-full max-w-sm">
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent rounded-3xl"></div>
          
          <!-- Watch Body -->
          <div class="relative">
            <!-- Watch Display -->
            <div :class="[
              'w-40 h-48 rounded-3xl relative shadow-2xl transition-all duration-500',
              getWatchBodyStyle()
            ]">
              <!-- Screen -->
              <div class="absolute inset-4 bg-black rounded-2xl flex items-center justify-center overflow-hidden">
                <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <div class="text-white text-center">
                    <div class="text-2xl font-bold">14:25</div>
                    <div class="text-sm opacity-80">Health+</div>
                  </div>
                </div>
              </div>
              
              <!-- Crown -->
              <div :class="[
                'absolute right-0 top-16 w-3 h-8 rounded-l-lg transition-all duration-300',
                getWatchBodyStyle()
              ]"></div>
            </div>

            <!-- Watch Band -->
            <div class="absolute -left-5 top-1/2 transform -translate-y-1/2">
              <div :class="[
                'w-10 h-36 rounded-full transition-all duration-500',
                getBandStyle()
              ]"></div>
            </div>
            <div class="absolute -right-5 top-1/2 transform -translate-y-1/2">
              <div :class="[
                'w-10 h-36 rounded-full transition-all duration-500',
                getBandStyle()
              ]"></div>
            </div>
          </div>
        </div>

        </div>
        
        <!-- Product Info -->
        <div class="text-center mt-4">
          <h2 class="text-lg font-bold text-white mb-1">{{ currentConfig.name || 'HealthWatch Pro' }}</h2>
          <div class="flex items-center justify-center space-x-3 text-sm text-gray-300">
            <span>{{ currentVariant }}/{{ totalVariants }}</span>
            <span>•</span>
            <span>{{ currentConfig.material }}</span>
          </div>
        </div>
      </div>

      <!-- Horizontal Customization Slider -->
      <div class="bg-gray-900/95 backdrop-blur-lg border-t border-white/20 px-6 py-4" style="height: 45%;">
        <!-- Category Tabs -->
        <div class="flex justify-center mb-3">
          <div class="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button 
              v-for="category in customizationCategories" 
              :key="category.id"
              @click="activeCategory = category.id"
              :class="[
                'px-3 py-2 rounded-full text-xs font-medium transition-all duration-300',
                activeCategory === category.id 
                  ? 'bg-white text-gray-900' 
                  : 'text-white/70 hover:text-white'
              ]"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Options Container -->
        <div class="flex-1 flex flex-col justify-center">
          <!-- Material Selection -->
          <div v-if="activeCategory === 'material'" class="text-center">
            <h3 class="text-white font-medium mb-4">材质选择</h3>
            <div class="flex space-x-3 justify-center">
              <button 
                v-for="material in materials" 
                :key="material.id"
                @click="selectMaterial(material)"
                :class="[
                  'px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border',
                  currentConfig.materialId === material.id 
                    ? 'bg-white text-gray-900 border-white' 
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                ]"
              >
                {{ material.name }}
              </button>
            </div>
          </div>

          <!-- Body Color Selection -->
          <div v-if="activeCategory === 'bodyColor'" class="text-center">
            <h3 class="text-white font-medium mb-4">表身颜色</h3>
            <div class="flex space-x-4 justify-center">
              <button 
                v-for="color in bodyColors" 
                :key="color.id"
                @click="selectBodyColor(color)"
                :class="[
                  'w-14 h-14 rounded-full border-4 transition-all duration-300 shadow-lg',
                  currentConfig.bodyColorId === color.id 
                    ? 'border-white scale-110' 
                    : 'border-white/30 hover:border-white/60 hover:scale-105'
                ]"
                :style="{ backgroundColor: color.value }"
              >
                <span class="sr-only">{{ color.name }}</span>
              </button>
            </div>
            <p class="text-gray-300 text-sm mt-3">{{ getCurrentBodyColor()?.name }}</p>
          </div>

          <!-- Band Color Selection -->
          <div v-if="activeCategory === 'bandColor'" class="text-center">
            <h3 class="text-white font-medium mb-4">表带颜色</h3>
            <div class="flex space-x-4 justify-center">
              <button 
                v-for="color in bandColors" 
                :key="color.id"
                @click="selectBandColor(color)"
                :class="[
                  'w-14 h-14 rounded-full border-4 transition-all duration-300 shadow-lg',
                  currentConfig.bandColorId === color.id 
                    ? 'border-white scale-110' 
                    : 'border-white/30 hover:border-white/60 hover:scale-105'
                ]"
                :style="{ backgroundColor: color.value }"
              >
                <span class="sr-only">{{ color.name }}</span>
              </button>
            </div>
            <p class="text-gray-300 text-sm mt-3">{{ getCurrentBandColor()?.name }}</p>
          </div>

          <!-- Size Selection -->
          <div v-if="activeCategory === 'size'" class="text-center">
            <h3 class="text-white font-medium mb-4">尺寸规格</h3>
            <div class="flex space-x-3 justify-center">
              <button 
                v-for="size in sizes" 
                :key="size.id"
                @click="selectSize(size)"
                :class="[
                  'px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border',
                  currentConfig.sizeId === size.id 
                    ? 'bg-white text-gray-900 border-white' 
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                ]"
              >
                {{ size.name }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Price and Add to Cart -->
        <div class="border-t border-white/10 pt-3 mt-auto">
          <div class="flex items-center justify-between">
            <div class="text-white">
              <p class="text-sm text-gray-300">定制价格</p>
              <p class="text-xl font-bold">¥{{ calculatePrice() }}</p>
            </div>
            <button @click="addToCart" 
                    class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors duration-300 shadow-lg text-sm">
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 当前配置
const currentConfig = ref({
  name: 'HealthWatch Pro',
  materialId: 'aluminum',
  material: '铝合金',
  bodyColorId: 'silver',
  bandColorId: 'black',
  sizeId: '42mm',
  basePrice: 1299
});

// 材质选项
const materials = ref([
  { id: 'aluminum', name: '铝合金', price: 0 },
  { id: 'steel', name: '不锈钢', price: 500 },
  { id: 'titanium', name: '钛合金', price: 1000 }
]);

// 表身颜色选项
const bodyColors = ref([
  { id: 'silver', name: '银色', value: '#C0C0C0' },
  { id: 'black', name: '深空黑', value: '#2D2D2D' },
  { id: 'gold', name: '金色', value: '#D4AF37' },
  { id: 'blue', name: '海洋蓝', value: '#1E40AF' },
  { id: 'green', name: '松绿色', value: '#059669' }
]);

// 表带颜色选项
const bandColors = ref([
  { id: 'black', name: '黑色', value: '#1F1F1F' },
  { id: 'white', name: '白色', value: '#FFFFFF' },
  { id: 'brown', name: '棕色', value: '#8B4513' },
  { id: 'blue', name: '蓝色', value: '#3B82F6' },
  { id: 'red', name: '红色', value: '#DC2626' },
  { id: 'purple', name: '紫色', value: '#7C3AED' }
]);

// 尺寸选项
const sizes = ref([
  { id: '38mm', name: '38mm', price: 0 },
  { id: '42mm', name: '42mm', price: 0 },
  { id: '45mm', name: '45mm', price: 200 }
]);

// 当前变体和总变体数
const currentVariant = ref(1);
const totalVariants = computed(() => {
  return materials.value.length * bodyColors.value.length * bandColors.value.length * sizes.value.length;
});

// 定制分类管理
const activeCategory = ref('material');
const customizationCategories = ref([
  { id: 'material', name: '材质' },
  { id: 'bodyColor', name: '表身' },
  { id: 'bandColor', name: '表带' },
  { id: 'size', name: '尺寸' }
]);

// 选择材质
const selectMaterial = (material) => {
  currentConfig.value.materialId = material.id;
  currentConfig.value.material = material.name;
};

// 选择表身颜色
const selectBodyColor = (color) => {
  currentConfig.value.bodyColorId = color.id;
};

// 选择表带颜色
const selectBandColor = (color) => {
  currentConfig.value.bandColorId = color.id;
};

// 选择尺寸
const selectSize = (size) => {
  currentConfig.value.sizeId = size.id;
};

// 获取当前表身颜色
const getCurrentBodyColor = () => {
  return bodyColors.value.find(color => color.id === currentConfig.value.bodyColorId);
};

// 获取当前表带颜色
const getCurrentBandColor = () => {
  return bandColors.value.find(color => color.id === currentConfig.value.bandColorId);
};

// 获取表身样式
const getWatchBodyStyle = () => {
  const color = getCurrentBodyColor();
  if (!color) return 'bg-gray-300';
  
  if (color.id === 'silver') return 'bg-gradient-to-br from-gray-300 to-gray-400';
  if (color.id === 'black') return 'bg-gradient-to-br from-gray-800 to-gray-900';
  if (color.id === 'gold') return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
  if (color.id === 'blue') return 'bg-gradient-to-br from-blue-600 to-blue-800';
  if (color.id === 'green') return 'bg-gradient-to-br from-green-600 to-green-800';
  
  return `bg-gradient-to-br from-gray-300 to-gray-400`;
};

// 获取表带样式
const getBandStyle = () => {
  const color = getCurrentBandColor();
  if (!color) return 'bg-black';
  
  return `bg-gradient-to-b from-gray-600 to-[${color.value}]`;
};

// 计算价格
const calculatePrice = () => {
  const materialPrice = materials.value.find(m => m.id === currentConfig.value.materialId)?.price || 0;
  const sizePrice = sizes.value.find(s => s.id === currentConfig.value.sizeId)?.price || 0;
  
  return currentConfig.value.basePrice + materialPrice + sizePrice;
};

// 返回上级页面
const goBack = () => {
  router.go(-1);
};

// 完成定制
const completeCustomization = () => {
  // 这里可以添加保存配置的逻辑
  console.log('定制配置：', currentConfig.value);
  
  // 可以跳转到确认页面或返回商城
  router.push('/mall');
};

// 加入购物车
const addToCart = () => {
  // 这里添加购物车逻辑
  console.log('已加入购物车：', {
    ...currentConfig.value,
    price: calculatePrice()
  });
  
  // 显示成功提示或跳转
  alert('已成功加入购物车！');
  router.push('/mall');
};
</script>

<style scoped>
/* 添加一些自定义动画 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.watch-float {
  animation: float 6s ease-in-out infinite;
}

/* 渐变背景动画 */
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

/* 隐藏滚动条 */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* 页面全高度布局 */
.min-h-screen {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}
</style> 