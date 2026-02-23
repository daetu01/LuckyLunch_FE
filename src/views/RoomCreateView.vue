<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 방 생성 화면
// 요구사항(기획서):
// - 투표 권한(1인1표 vs 중복)
// - 마감 시간(프리셋/직접 설정)
// - 베팅률(고정 vs 인원 비례)
//
// TODO(백엔드):
// - POST /rooms 로 생성 요청
// - 응답으로 roomId / joinLink 등을 받아 다음 화면으로 이동

const router = useRouter()

const title = ref('오늘의 런치 잭팟')
const allowMultipleVotes = ref(false)
const closeMinutes = ref(10)
const oddsMode = ref<'fixed' | 'proportional'>('proportional')

async function createRoom() {
  // TODO(백엔드): 실제로는 아래 payload를 서버로 전송합니다.
  const payload = {
    title: title.value,
    allowMultipleVotes: allowMultipleVotes.value,
    closeMinutes: closeMinutes.value,
    oddsMode: oddsMode.value,
  }

  // eslint-disable-next-line no-console
  console.log('[RoomCreate payload]', payload)

  // 데모: 임의 roomId로 이동
  router.push('/rooms/demo')
}
</script>

<template>
  <section class="min-h-screen bg-gray-50/50">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <div>
        <h2 class="text-2xl font-semibold">방 만들기</h2>
        <p class="mt-1 text-sm text-gray-600">베팅 옵션을 설정하고 링크로 친구를 초대하세요.</p>
      </div>

      <div class="mt-6 space-y-4">
        <!-- 방 제목 -->
        <div class="apple-card">
          <div class="p-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">방 제목</label>
            <input 
              class="input-field" 
              v-model="title" 
              placeholder="예: 오늘 점심 뭐먹지" 
            />
          </div>
        </div>

        <!-- 옵션 카드들 -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- 투표 권한 -->
          <div class="apple-card">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <div class="text-base font-semibold mb-1">투표 권한</div>
                  <p class="text-sm text-gray-500">1인 1표 또는 중복 투표 허용</p>
                </div>
              </div>

              <label class="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <span class="font-medium text-gray-700">중복 투표 허용</span>
                <input 
                  type="checkbox" 
                  v-model="allowMultipleVotes" 
                  class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          <!-- 마감 시간 -->
          <div class="apple-card">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <div class="text-base font-semibold mb-1">마감 시간</div>
                  <p class="text-sm text-gray-500">타이머 종료 시 결과 발표</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input 
                  class="flex-1 bg-transparent border-none outline-none text-base font-semibold" 
                  type="number" 
                  min="1" 
                  step="1" 
                  v-model="closeMinutes" 
                />
                <span class="text-sm font-medium text-gray-600">분</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 베팅률 -->
        <div class="apple-card">
          <div class="p-6">
            <div class="flex items-start justify-between mb-6">
              <div>
                <div class="text-base font-semibold mb-1">베팅률 방식</div>
                <p class="text-sm text-gray-500">고정 배당 또는 참여 인원 비례</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <label 
                class="relative p-4 border rounded-xl cursor-pointer transition-colors"
                :class="oddsMode === 'fixed' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'"
              >
                <input 
                  type="radio" 
                  value="fixed" 
                  v-model="oddsMode" 
                  class="sr-only"
                />
                <div class="text-center">
                  <div class="font-semibold text-gray-900">고정 배당</div>
                  <div class="text-xs text-gray-500 mt-1">일정한 배율 적용</div>
                </div>
                <div 
                  v-if="oddsMode === 'fixed'" 
                  class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-xs">✓</span>
                </div>
              </label>

              <label 
                class="relative p-4 border rounded-xl cursor-pointer transition-colors"
                :class="oddsMode === 'proportional' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'"
              >
                <input 
                  type="radio" 
                  value="proportional" 
                  v-model="oddsMode" 
                  class="sr-only"
                />
                <div class="text-center">
                  <div class="font-semibold text-gray-900">인원 비례</div>
                  <div class="text-xs text-gray-500 mt-1">참여자 수에 따라</div>
                </div>
                <div 
                  v-if="oddsMode === 'proportional'" 
                  class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-xs">✓</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- 액션 버튼 -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button 
            type="button" 
            class="btn-primary flex-1" 
            @click="createRoom"
          >
            방 생성하기
          </button>
          <RouterLink 
            to="/explore" 
            class="btn-secondary text-center"
          >
            탐색으로 돌아가기
          </RouterLink>
        </div>

        <!-- 안내 -->
        <div class="card">
          <div class="flex items-start gap-3">
            <div>
              <div class="font-semibold mb-1">백엔드 연동 안내</div>
              <p class="text-sm text-gray-600">
                Explore에서 선택한 식당(베팅 바구니)을 payload에 포함시켜 POST /rooms로 전송하면 MVP 플로우가 완성됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
