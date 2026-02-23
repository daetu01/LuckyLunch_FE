<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

// 마이 페이지
// - 유저 정보
// - 데일리 출석 포인트
// - 누적 승률/랭킹(추후)
//
// TODO(백엔드):
// - GET /me (유저 프로필)
// - GET /me/points (포인트 내역)
// - GET /me/stats (랭킹/승률)

const auth = useAuthStore()

const name = computed(() => auth.user?.name ?? 'Guest')
</script>

<template>
  <section class="min-h-screen bg-gray-50/50">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <div>
        <h2 class="text-2xl font-semibold">마이</h2>
        <p class="mt-1 text-sm text-gray-600">계정/포인트/기록을 확인합니다.</p>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <div class="card">
          <div class="text-sm text-gray-500">사용자</div>
          <div class="mt-1 text-lg font-semibold">{{ name }}</div>
          <p class="mt-2 text-xs text-gray-500">TODO(인증): Google OAuth 연동 후 avatar/email 등을 노출하세요.</p>
        </div>

        <div class="card">
          <div class="text-sm text-gray-500">보유 포인트</div>
          <div class="mt-1 text-2xl font-semibold">{{ auth.points.toLocaleString() }}<span class="ml-1 text-sm text-gray-500">P</span></div>
          <p class="mt-2 text-xs text-gray-500">TODO(포인트): 출석/정산 포인트 히스토리를 추가하세요.</p>
        </div>
      </div>

    </div>
  </section>
</template>
