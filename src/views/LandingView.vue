<script setup lang="ts">
import { useRouter } from 'vue-router'

// 랜딩 페이지는 “애플 홈페이지 같은” 히어로 섹션 + 기능 요약으로 구성합니다.
// - 백엔드 연동이 없어도 가장 먼저 서비스 컨셉이 전달되게 만드는 화면

const router = useRouter()

function goExplore() {
  router.push('/explore')
}
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="text-sm text-gray-600">점심 베팅 시스템</p>
          <h1 class="mt-3 text-4xl font-semibold">오늘 점심, 베팅으로 결정</h1>
          <p class="mt-4 text-gray-600">
            위치 기반 식당 후보군에 포인트를 베팅하고 결과에 따라 포인트를 얻는 메뉴 결정 서비스.
          </p>

          <div class="mt-6 flex items-center gap-3">
            <button type="button" class="btn-primary" @click="goExplore">탐색하기</button>
            <RouterLink to="/rooms/new" class="btn-secondary">방 만들기</RouterLink>
          </div>

          <div class="mt-10 grid gap-3 sm:grid-cols-3">
            <div class="card">
              <div class="text-sm text-gray-500">탐색</div>
              <div class="mt-1 font-semibold">주변 식당 후보 선택</div>
            </div>
            <div class="card">
              <div class="text-sm text-gray-500">베팅</div>
              <div class="mt-1 font-semibold">포인트로 참여</div>
            </div>
            <div class="card">
              <div class="text-sm text-gray-500">정산</div>
              <div class="mt-1 font-semibold">결과 발표/분배</div>
            </div>
          </div>
        </div>

        <div class="apple-card">
          <div class="p-6">
            <div class="text-sm text-gray-500">Preview</div>
            <div class="mt-4 space-y-3">
              <div class="h-10 rounded-xl bg-gray-100" />
              <div class="h-10 rounded-xl bg-gray-100" />
              <div class="h-10 rounded-xl bg-gray-100" />
              <div class="h-40 rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
