<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// 탐색 화면은 MVP에서 가장 중요한 화면입니다.
// 요구사항:
// - 좌측: 식당 리스트(텍스트)
// - 우측: 지도(핀)
// - 최대 10개까지 “베팅 바구니”에 담기
//
// TODO(백엔드/지도):
// - 실제로는 위치 권한을 받고, 좌표/반경으로 주변 식당 API를 호출합니다.
// - 지도 SDK(구글/카카오) 로더를 붙여서 우측 영역에 맵을 렌더링합니다.

type Place = {
  id: string
  name: string
  category?: string
  distanceMeters?: number
}

const radiusMeters = ref(800)

const places = ref<Place[]>([])

// “베팅 바구니” (최대 10개)
const basket = ref<Place[]>([])

const basketCount = computed(() => basket.value.length)

const canAddMore = computed(() => basket.value.length < 10)

function isInBasket(placeId: string) {
  return basket.value.some((p) => p.id === placeId)
}

function toggleBasket(place: Place) {
  if (isInBasket(place.id)) {
    basket.value = basket.value.filter((p) => p.id !== place.id)
    return
  }

  if (!canAddMore.value) return
  basket.value = [...basket.value, place]
}

async function loadNearbyPlaces() {
  // TODO(백엔드):
  // - GET /places?lat=...&lng=...&radius=...
  // - 또는 네가 구현하는 엔드포인트에 맞춰 교체
  // 지금은 UI 개발용 더미 데이터입니다.

  places.value = [
    { id: 'p1', name: '스시 오마카세', category: '일식', distanceMeters: 120 },
    { id: 'p2', name: '국밥집', category: '한식', distanceMeters: 240 },
    { id: 'p3', name: '수제버거', category: '양식', distanceMeters: 310 },
    { id: 'p4', name: '마라탕', category: '중식', distanceMeters: 450 },
    { id: 'p5', name: '샐러드랩', category: '건강', distanceMeters: 520 },
  ]
}

onMounted(() => {
  loadNearbyPlaces()
})
</script>

<template>
  <section class="min-h-screen bg-gray-50/50">
    <div class="mx-auto max-w-6xl px-6 py-8">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold">주변 식당</h2>
          <p class="mt-1 text-sm text-gray-600">최대 10개까지 선택해 베팅 바구니에 담아보세요.</p>
        </div>

        <div class="flex items-center gap-3">
          <label class="text-sm text-gray-600">반경</label>
          <input class="input-field w-32" type="number" min="100" step="100" v-model="radiusMeters" />
          <button type="button" class="btn-primary" @click="loadNearbyPlaces">새로고침</button>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <!-- 좌: 리스트 + 베팅 바구니 -->
        <div class="lg:col-span-2 space-y-4">
          <!-- 식당 리스트 -->
          <div class="apple-card">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold">식당 리스트</h3>
                <div class="text-sm text-gray-500">{{ places.length }}곳</div>
              </div>

              <div class="space-y-3">
                <button
                  v-for="p in places"
                  :key="p.id"
                  type="button"
                  class="w-full text-left rounded-xl px-4 py-3 border transition-colors"
                  :class="isInBasket(p.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'"
                  @click="toggleBasket(p)"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex-1">
                      <div class="font-medium text-gray-900">{{ p.name }}</div>
                      <div class="mt-1 flex items-center gap-2 text-xs text-gray-500">
                        <span>{{ p.category ?? '카테고리' }}</span>
                        <span>·</span>
                        <span>{{ p.distanceMeters ?? 0 }}m</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <div 
                        class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                        :class="isInBasket(p.id) 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'"
                      >
                        <span v-if="isInBasket(p.id)" class="text-white text-xs">✓</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <p class="mt-6 text-xs text-gray-400">리스트 클릭 시 지도에서 해당 식당 핀을 강조 표시(지도 SDK 연동 후)</p>
            </div>
          </div>

          <!-- 베팅 바구니 -->
          <div class="apple-card">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold">베팅 바구니</h3>
                <div class="text-sm text-gray-500">{{ basketCount }}/10</div>
              </div>

              <div v-if="basket.length === 0" class="py-10 text-center text-sm text-gray-500">
                아직 선택된 식당이 없어요.
              </div>

              <div v-else class="space-y-2">
                <div
                  v-for="(b, idx) in basket"
                  :key="b.id"
                  class="flex items-center justify-between rounded-xl px-4 py-3 bg-gray-50 border border-gray-200"
                  :style="{ animationDelay: `${idx * 0.05}s` }"
                >
                  <div class="flex items-center gap-3">
                    <div class="font-medium text-gray-900">{{ b.name }}</div>
                  </div>
                  <button 
                    type="button" 
                    class="text-sm text-red-600 hover:text-red-700"
                    @click="toggleBasket(b)"
                  >
                    제거
                  </button>
                </div>
              </div>

              <div class="mt-6 space-y-3">
                <RouterLink
                  to="/rooms/new"
                  class="btn-primary w-full text-center block"
                  :class="basket.length === 0 ? 'opacity-50 pointer-events-none' : ''"
                >
                  이 후보로 방 만들기
                </RouterLink>
                <button 
                  type="button" 
                  class="btn-secondary w-full" 
                  @click="basket = []"
                  :disabled="basket.length === 0"
                >
                  초기화
                </button>
              </div>

              <p class="mt-6 text-xs text-gray-400">선택한 후보군은 방 생성 시 전달하면 됩니다.</p>
            </div>
          </div>
        </div>

        <!-- 우: 지도 영역(placeholder) -->
        <div class="lg:col-span-3">
          <div class="apple-card">
            <div class="p-6 h-[520px] flex flex-col">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">지도</h3>
                <div class="text-sm text-gray-500">반경 {{ radiusMeters }}m</div>
              </div>

              <div class="flex-1 rounded-xl bg-gray-100 flex items-center justify-center">
                <div class="text-center text-sm text-gray-500">
                  지도 SDK 연동 전 영역
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
