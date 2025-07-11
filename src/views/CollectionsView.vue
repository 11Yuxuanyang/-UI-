<template>
  <div class="text-white min-h-screen pb-20">
    <!-- Header -->
    <div class="px-6 pt-6 pb-4">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <button @click="$router.go(-1)" class="w-10 h-10 bg-gray-800/40 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50">
            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h1 class="text-2xl font-bold mb-1">我的藏品</h1>
            <p class="text-sm text-gray-400">专属健康NFT收藏</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-lg font-bold text-purple-400">{{ nftCollections.length }}</div>
          <div class="text-xs text-gray-400">总藏品</div>
        </div>
      </div>

      <!-- Collection Stats -->
      <div class="grid grid-cols-3 gap-3 mb-6">
        <div class="bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 text-center">
          <div class="text-2xl font-bold text-blue-400 mb-1">{{ nftCollections.length }}</div>
          <div class="text-xs text-gray-400">总藏品</div>
        </div>
        <div class="bg-gradient-to-br from-green-600/30 via-blue-600/20 to-purple-600/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 text-center">
          <div class="text-2xl font-bold text-green-400 mb-1">{{ nftCollections.filter(item => item.rarity === 'rare' || item.rarity === 'epic' || item.rarity === 'legendary').length }}</div>
          <div class="text-xs text-gray-400">稀有藏品</div>
        </div>
        <div class="bg-gradient-to-br from-yellow-600/30 via-orange-600/20 to-red-600/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 text-center">
          <div class="text-2xl font-bold text-yellow-400 mb-1">{{ Math.round(nftCollections.reduce((sum, item) => sum + item.value, 0)) }}</div>
          <div class="text-xs text-gray-400">总价值</div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex space-x-2 mb-6">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="activeFilter = filter.id"
          :class="[
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
            activeFilter === filter.id 
              ? 'bg-purple-500 text-white shadow-lg' 
              : 'bg-gray-800/40 text-gray-300 hover:text-white border border-gray-700/50'
          ]"
        >
          {{ filter.name }}
        </button>
      </div>
    </div>

    <!-- NFT Grid -->
    <div class="px-6">
      <div class="grid grid-cols-2 gap-4">
        <div 
          v-for="nft in filteredCollections" 
          :key="nft.id"
          :class="[
            'relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer',
            nft.rarity === 'common' ? 'border-gray-600/50 bg-gray-800/40' : '',
            nft.rarity === 'rare' ? 'border-blue-500/50 bg-blue-900/20' : '',
            nft.rarity === 'epic' ? 'border-purple-500/50 bg-purple-900/20' : '',
            nft.rarity === 'legendary' ? 'border-yellow-500/50 bg-yellow-900/20' : ''
          ]"
          @click="showNFTDetail(nft)"
        >
          <!-- Rarity Badge -->
          <div class="absolute top-3 right-3 z-10">
            <div :class="[
              'px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm',
              nft.rarity === 'common' ? 'bg-gray-600/70 text-gray-300' : '',
              nft.rarity === 'rare' ? 'bg-blue-600/70 text-blue-300' : '',
              nft.rarity === 'epic' ? 'bg-purple-600/70 text-purple-300' : '',
              nft.rarity === 'legendary' ? 'bg-yellow-600/70 text-yellow-300' : ''
            ]">
              {{ nft.rarityText }}
            </div>
          </div>

          <!-- NFT Image/Icon -->
          <div class="aspect-square relative">
            <div :class="[
              'w-full h-full flex items-center justify-center',
              nft.rarity === 'common' ? 'bg-gradient-to-br from-gray-600/30 to-gray-800/50' : '',
              nft.rarity === 'rare' ? 'bg-gradient-to-br from-blue-600/30 to-blue-800/50' : '',
              nft.rarity === 'epic' ? 'bg-gradient-to-br from-purple-600/30 to-purple-800/50' : '',
              nft.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-600/30 to-yellow-800/50' : ''
            ]">
              <svg :class="[
                'w-16 h-16',
                nft.rarity === 'common' ? 'text-gray-400' : '',
                nft.rarity === 'rare' ? 'text-blue-400' : '',
                nft.rarity === 'epic' ? 'text-purple-400' : '',
                nft.rarity === 'legendary' ? 'text-yellow-400' : ''
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="nft.icon"/>
              </svg>
            </div>
            
            <!-- Shine Effect for rare items -->
            <div v-if="nft.rarity !== 'common'" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full animate-pulse"></div>
          </div>

          <!-- NFT Info -->
          <div class="p-4">
            <h4 class="font-semibold text-white text-sm mb-1">{{ nft.name }}</h4>
            <p class="text-xs text-gray-400 mb-3 line-clamp-2">{{ nft.description }}</p>
            
            <div class="flex items-center justify-between">
              <div class="text-xs text-gray-500">{{ nft.obtainedDate }}</div>
              <div :class="[
                'text-sm font-bold',
                nft.rarity === 'common' ? 'text-gray-400' : '',
                nft.rarity === 'rare' ? 'text-blue-400' : '',
                nft.rarity === 'epic' ? 'text-purple-400' : '',
                nft.rarity === 'legendary' ? 'text-yellow-400' : ''
              ]">{{ nft.value }} 积分</div>
            </div>

            <!-- Special Effects -->
            <div v-if="nft.specialEffect" class="mt-2 text-xs text-center">
              <span :class="[
                'px-2 py-1 rounded-full',
                nft.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' : '',
                nft.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' : '',
                nft.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-300' : ''
              ]">
                ✨ {{ nft.specialEffect }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCollections.length === 0" class="text-center py-12">
        <div class="w-20 h-20 bg-gray-800/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
        </div>
        <h4 class="text-lg font-semibold text-white mb-2">暂无{{ activeFilter === 'all' ? '' : filters.find(f => f.id === activeFilter)?.name }}藏品</h4>
        <p class="text-sm text-gray-400">完成更多健康挑战来获得专属NFT藏品吧！</p>
      </div>
    </div>

    <!-- NFT Detail Modal -->
    <div v-if="selectedNFT" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" @click="closeNFTDetail">
      <div class="bg-gray-900/90 backdrop-blur-lg rounded-3xl border border-gray-700/50 max-w-sm w-full" @click.stop>
        <!-- Modal Header -->
        <div class="p-6 border-b border-gray-700/50">
          <div class="flex items-center justify-between">
            <div :class="[
              'px-3 py-1 rounded-lg text-sm font-medium',
              selectedNFT.rarity === 'common' ? 'bg-gray-600/50 text-gray-300' : '',
              selectedNFT.rarity === 'rare' ? 'bg-blue-600/50 text-blue-300' : '',
              selectedNFT.rarity === 'epic' ? 'bg-purple-600/50 text-purple-300' : '',
              selectedNFT.rarity === 'legendary' ? 'bg-yellow-600/50 text-yellow-300' : ''
            ]">
              {{ selectedNFT.rarityText }}
            </div>
            <button @click="closeNFTDetail" class="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- NFT Image -->
          <div class="aspect-square relative mb-6">
            <div :class="[
              'w-full h-full flex items-center justify-center rounded-2xl',
              selectedNFT.rarity === 'common' ? 'bg-gradient-to-br from-gray-600/30 to-gray-800/50' : '',
              selectedNFT.rarity === 'rare' ? 'bg-gradient-to-br from-blue-600/30 to-blue-800/50' : '',
              selectedNFT.rarity === 'epic' ? 'bg-gradient-to-br from-purple-600/30 to-purple-800/50' : '',
              selectedNFT.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-600/30 to-yellow-800/50' : ''
            ]">
              <svg :class="[
                'w-24 h-24',
                selectedNFT.rarity === 'common' ? 'text-gray-400' : '',
                selectedNFT.rarity === 'rare' ? 'text-blue-400' : '',
                selectedNFT.rarity === 'epic' ? 'text-purple-400' : '',
                selectedNFT.rarity === 'legendary' ? 'text-yellow-400' : ''
              ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="selectedNFT.icon"/>
              </svg>
            </div>
            <div v-if="selectedNFT.rarity !== 'common'" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full animate-pulse rounded-2xl"></div>
          </div>

          <!-- NFT Details -->
          <div class="text-center">
            <h3 class="text-xl font-bold text-white mb-2">{{ selectedNFT.name }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ selectedNFT.description }}</p>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-gray-800/50 rounded-xl p-3">
                <div class="text-xs text-gray-500 mb-1">价值</div>
                <div :class="[
                  'text-lg font-bold',
                  selectedNFT.rarity === 'common' ? 'text-gray-400' : '',
                  selectedNFT.rarity === 'rare' ? 'text-blue-400' : '',
                  selectedNFT.rarity === 'epic' ? 'text-purple-400' : '',
                  selectedNFT.rarity === 'legendary' ? 'text-yellow-400' : ''
                ]">{{ selectedNFT.value }} 积分</div>
              </div>
              <div class="bg-gray-800/50 rounded-xl p-3">
                <div class="text-xs text-gray-500 mb-1">获得时间</div>
                <div class="text-lg font-bold text-white">{{ selectedNFT.obtainedDate }}</div>
              </div>
            </div>

            <div v-if="selectedNFT.specialEffect" class="bg-gray-800/50 rounded-xl p-3">
              <div class="text-xs text-gray-500 mb-2">特殊效果</div>
              <div :class="[
                'text-sm font-medium',
                selectedNFT.rarity === 'rare' ? 'text-blue-300' : '',
                selectedNFT.rarity === 'epic' ? 'text-purple-300' : '',
                selectedNFT.rarity === 'legendary' ? 'text-yellow-300' : ''
              ]">
                ✨ {{ selectedNFT.specialEffect }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')
const selectedNFT = ref(null)

const filters = ref([
  { id: 'all', name: '全部' },
  { id: 'legendary', name: '传说' },
  { id: 'epic', name: '史诗' },
  { id: 'rare', name: '稀有' },
  { id: 'common', name: '普通' }
])

const nftCollections = ref([
  {
    id: 1,
    name: '健康勇士',
    description: '象征着坚持不懈和健康生活方式的NFT徽章，代表您在健康道路上的坚定决心',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
    rarity: 'rare',
    rarityText: '稀有',
    value: 500,
    obtainedDate: '2023-10-25',
    specialEffect: '提升健康积分获取速度20%'
  },
  {
    id: 2,
    name: '活力小子',
    description: '代表活力和积极生活的NFT，展现您对运动健身的热爱和追求',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    rarity: 'epic',
    rarityText: '史诗',
    value: 1200,
    obtainedDate: '2023-10-26',
    specialEffect: '增加每日步数奖励30%'
  },
  {
    id: 3,
    name: '健康小卫士',
    description: '守护健康和快乐的传说级NFT，象征着您对健康生活的完美掌控',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    rarity: 'legendary',
    rarityText: '传说',
    value: 2000,
    obtainedDate: '2023-10-27',
    specialEffect: '解锁所有成就并获得专属称号'
  },
  {
    id: 4,
    name: '健康小精灵',
    description: '带来好运和健康的可爱NFT，是您健康之旅的忠实伙伴',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    rarity: 'common',
    rarityText: '普通',
    value: 100,
    obtainedDate: '2023-10-28',
    specialEffect: null
  },
  {
    id: 5,
    name: '运动之星',
    description: '专为运动爱好者设计的稀有NFT，记录您在健身路上的每一步成长',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    rarity: 'rare',
    rarityText: '稀有',
    value: 600,
    obtainedDate: '2023-10-29',
    specialEffect: '运动成就奖励翻倍'
  },
  {
    id: 6,
    name: '睡眠大师',
    description: '象征优质睡眠和生活平衡的史诗级NFT，见证您的作息规律之路',
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    rarity: 'epic',
    rarityText: '史诗',
    value: 1000,
    obtainedDate: '2023-10-30',
    specialEffect: '睡眠质量监测精准度提升50%'
  }
])

const filteredCollections = computed(() => {
  if (activeFilter.value === 'all') {
    return nftCollections.value
  }
  return nftCollections.value.filter(nft => nft.rarity === activeFilter.value)
})

const showNFTDetail = (nft) => {
  selectedNFT.value = nft
}

const closeNFTDetail = () => {
  selectedNFT.value = null
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 