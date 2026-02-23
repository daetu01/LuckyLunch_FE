<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 방 참여(베팅 진행) 화면
// - 공유 링크(/rooms/:roomId)로 진입
// - 각 식당에 포인트 베팅
// - 실시간 현황(추후 websocket/SSE)
//
// TODO(백엔드):
// - GET /rooms/:roomId (방 정보 + 후보군)
// - POST /rooms/:roomId/bets (베팅)

const route = useRoute()
const router = useRouter()

const roomId = computed(() => String(route.params.roomId ?? ''))

type Candidate = {
  id: string
  name: string
  totalPoints: number
}

// 데모 후보군
const candidates = ref<Candidate[]>([
  { id: 'c1', name: '국밥집', totalPoints: 120 },
  { id: 'c2', name: '수제버거', totalPoints: 80 },
  { id: 'c3', name: '마라탕', totalPoints: 40 },
])

const myPoints = ref(300)

const betAmount = ref(50)

function betOn(candidateId: string) {
  // TODO(백엔드):
  // - 내가 가진 포인트 차감
  // - 서버로 베팅 요청
  // - 서버가 브로드캐스트하는 실시간 집계 반영

  if (betAmount.value <= 0) return
  if (betAmount.value > myPoints.value) return

  const target = candidates.value.find((c) => c.id === candidateId)
  if (!target) return

  myPoints.value -= betAmount.value
  target.totalPoints += betAmount.value
}

function goDashboard() {
  router.push(`/rooms/${roomId.value}/dashboard`)
}
</script>

<template>
  <section class="mx-auto max-w-4xl px-6 py-10">
    <div class="flex items-start justify-between gap-6">
      <div>
        <h2 class="text-2xl font-semibold tracking-tight">베팅 진행</h2>
        <p class="mt-1 text-sm text-apple-gray">Room ID: {{ roomId }}</p>
      </div>

      <div class="card w-64">
        <div class="text-sm text-apple-gray">내 포인트</div>
        <div class="mt-1 text-2xl font-semibold">{{ myPoints }}</div>

        <div class="mt-4">
          <label class="text-sm text-apple-gray">베팅 포인트</label>
          <input class="input-field mt-2" type="number" min="1" step="1" v-model="betAmount" />
        </div>

        <button type="button" class="btn-secondary w-full mt-4" @click="goDashboard">
          대시보드 보기
        </button>
      </div>
    </div>

    <div class="mt-8 grid md:grid-cols-2 gap-4">
      <div v-for="c in candidates" :key="c.id" class="card">
        <div class="flex items-center justify-between">
          <div class="font-semibold">{{ c.name }}</div>
          <div class="text-sm text-apple-gray">총 {{ c.totalPoints }}P</div>
        </div>

        <button type="button" class="btn-primary w-full mt-4" @click="betOn(c.id)">
          이 식당에 베팅
        </button>

        <p class="mt-3 text-xs text-apple-gray">
          TODO(실시간): WebSocket/SSE로 totalPoints를 실시간 업데이트하면
          “Real-time Dashboard” 경험이 자연스럽게 완성됩니다.
        </p>
      </div>
    </div>
  </section>
</template>
