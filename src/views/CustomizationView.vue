<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex flex-col">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.15),transparent_50%)]"></div>
    </div>

    <!-- Header -->
    <div class="relative z-10 flex items-center justify-between p-4">
      <button @click="goBack" class="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      
      <button @click="completeCustomization" 
              class="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm">
        完成
      </button>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex-1 flex flex-col px-4 pb-4">
      <!-- Product Display -->
      <div class="flex items-center justify-center py-4" style="height: 40%;">
        <div class="relative">
          <!-- Watch Display -->
          <div :class="[
            'w-32 h-40 rounded-3xl relative shadow-2xl transition-all duration-500',
            getWatchBodyStyle()
          ]">
            <!-- Screen -->
            <div class="absolute inset-3 bg-black rounded-2xl flex items-center justify-center overflow-hidden">
              <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <div class="text-white text-center">
                  <div class="text-lg font-bold">14:25</div>
                  <div class="text-xs opacity-80">Health+</div>
                </div>
              </div>
            </div>
            
            <!-- Crown -->
            <div :class="[
              'absolute right-0 top-12 w-2 h-6 rounded-l-lg transition-all duration-300',
              getWatchBodyStyle()
            ]"></div>
          </div>

          <!-- Watch Band -->
          <div class="absolute -left-4 top-1/2 transform -translate-y-1/2">
            <div :class="[
              'w-8 h-28 rounded-full transition-all duration-500',
              getBandStyle()
            ]"></div>
          </div>
          <div class="absolute -right-4 top-1/2 transform -translate-y-1/2">
            <div :class="[
              'w-8 h-28 rounded-full transition-all duration-500',
              getBandStyle()
            ]"></div>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="text-center py-2">
        <h2 class="text-lg font-bold text-white mb-1">{{ currentConfig.name || 'HealthWatch Pro' }}</h2>
        <div class="flex items-center justify-center space-x-3 text-sm text-gray-300">
          <span>{{ currentVariant }}/{{ totalVariants }}</span>
          <span>•</span>
          <span>{{ currentConfig.material }}</span>
        </div>
      </div>

      <!-- Customization Options -->
      <div class="flex-1 space-y-4">
        <!-- Material Selection -->
        <div class="text-center">
          <h3 class="text-white font-medium mb-3 text-sm">材质选择</h3>
          <div class="flex space-x-2 justify-center">
            <button 
              v-for="material in materials" 
              :key="material.id"
              @click="selectMaterial(material)"
              :class="[
                'px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border',
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
        <div class="text-center">
          <h3 class="text-white font-medium mb-3 text-sm">表身颜色</h3>
          <div class="flex space-x-3 justify-center">
            <button 
              v-for="color in bodyColors" 
              :key="color.id"
              @click="selectBodyColor(color)"
              :class="[
                'w-10 h-10 rounded-full border-3 transition-all duration-300 shadow-lg',
                currentConfig.bodyColorId === color.id 
                  ? 'border-white scale-110' 
                  : 'border-white/30 hover:border-white/60 hover:scale-105'
              ]"
              :style="{ backgroundColor: color.value }"
            >
              <span class="sr-only">{{ color.name }}</span>
            </button>
          </div>
          <p class="text-gray-300 text-xs mt-2">{{ getCurrentBodyColor()?.name }}</p>
        </div>

        <!-- Band Color Selection -->
        <div class="text-center">
          <h3 class="text-white font-medium mb-3 text-sm">表带颜色</h3>
          <div class="flex space-x-3 justify-center">
            <button 
              v-for="color in bandColors" 
              :key="color.id"
              @click="selectBandColor(color)"
              :class="[
                'w-10 h-10 rounded-full border-3 transition-all duration-300 shadow-lg',
                currentConfig.bandColorId === color.id 
                  ? 'border-white scale-110' 
                  : 'border-white/30 hover:border-white/60 hover:scale-105'
              ]"
              :style="{ backgroundColor: color.value }"
            >
              <span class="sr-only">{{ color.name }}</span>
            </button>
          </div>
          <p class="text-gray-300 text-xs mt-2">{{ getCurrentBandColor()?.name }}</p>
        </div>

        <!-- Size Selection -->
        <div class="text-center">
          <h3 class="text-white font-medium mb-3 text-sm">尺寸规格</h3>
          <div class="flex space-x-2 justify-center">
            <button 
              v-for="size in sizes" 
              :key="size.id"
              @click="selectSize(size)"
              :class="[
                'px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border',
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
      <div class="border-t border-white/10 pt-3 mt-4">
        <div class="flex items-center justify-between">
          <div class="text-white">
            <p class="text-xs text-gray-300">定制价格</p>
            <p class="text-lg font-bold">¥{{ calculatePrice() }}</p>
          </div>
          <button @click="addToCart" 
                  class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors duration-300 shadow-lg text-sm">
            加入购物车
          </button>
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
</style> 