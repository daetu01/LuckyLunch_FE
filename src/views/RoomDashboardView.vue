<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

// 결과/현황 대시보드
// - 실시간 베팅 현황 그래프(추후 chart.js 등)
// - 마감 시점 이후 승리 식당 발표
// - 포인트 정산 결과 표시
//
// TODO(백엔드):
// - GET /rooms/:roomId/dashboard (집계/타이머/승자)
// - 타이머 종료 이벤트 처리

const route = useRoute()
const roomId = computed(() => String(route.params.roomId ?? ''))

// 데모 집계 데이터
const stats = ref([
  { name: '국밥집', points: 120 },
  { name: '수제버거', points: 80 },
  { name: '마라탕', points: 40 },
])

const winnerName = ref<string | null>(null)

function revealWinner() {
  // 데모: 가장 points 높은 항목을 winner로 선택
  const w = [...stats.value].sort((a, b) => b.points - a.points)[0]
  winnerName.value = w?.name ?? null
}
</script>

<template>
  <section class="min-h-screen bg-gray-50/50">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <div>
        <h2 class="text-2xl font-semibold">대시보드</h2>
        <p class="mt-1 text-sm text-gray-600">Room ID: <span class="font-mono">{{ roomId }}</span></p>
      </div>

      <!-- 승자 발표 -->
      <div v-if="winnerName" class="mt-6 apple-card">
        <div class="p-6">
          <div class="text-sm text-gray-500">승리 식당</div>
          <div class="mt-1 text-2xl font-semibold">{{ winnerName }}</div>
          <p class="mt-2 text-sm text-gray-600">
            TODO(정산): 승자에 베팅한 유저가 낙첨 유저 포인트를 배당률에 따라 분배.
          </p>
        </div>
      </div>

      <!-- 결과 발표 버튼 -->
      <div v-else class="mt-6">
        <button type="button" class="btn-primary" @click="revealWinner">결과 발표(데모)</button>
      </div>

      <!-- 베팅 통계 카드들 -->
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <div 
          v-for="(s, idx) in stats" 
          :key="s.name" 
          class="card"
          :style="{ animationDelay: `${idx * 0.1}s` }"
        >
          <div class="p-6">
            <div class="mb-4">
              <div class="text-base font-semibold text-gray-900">{{ s.name }}</div>
              <div class="text-sm text-gray-500">총 베팅 포인트</div>
            </div>

            <div class="text-2xl font-semibold">{{ s.points }}<span class="ml-1 text-sm text-gray-500">P</span></div>

            <!-- 프로그레스 바 -->
            <div class="mt-3 relative h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                class="absolute inset-y-0 left-0 rounded-full bg-blue-600 transition-all duration-1000"
                :style="{ width: `${Math.min(100, (s.points / 200) * 100)}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 실시간 업데이트 안내 -->
      <p class="mt-6 text-xs text-gray-500">
        TODO(실시간): 서버에서 WebSocket/SSE 또는 polling으로 stats를 갱신하세요.
      </p>
    </div>
  </section>
</template>
