<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

// TopNav는 “애플 홈페이지”처럼 심플한 상단 바를 담당합니다.
// - 로그인/로그아웃 버튼
// - 주요 섹션 라우팅 링크
// - 추후: 알림, 포인트 요약, 프로필 드롭다운 등을 확장 가능

const auth = useAuthStore()

const isAuthed = computed(() => auth.isAuthenticated)

function onClickLogin() {
  // TODO(백엔드/인증):
  // - 여기서는 Google OAuth 시작을 “프론트 스텁”으로만 제공합니다.
  // - 실제 구현은 백엔드가 만든 OAuth 시작 URL로 리다이렉트하거나,
  //   프론트에서 구글 SDK로 토큰을 받아 백엔드에 전달하는 방식으로 교체하세요.
  auth.startGoogleLogin()
}

function onClickLogout() {
  // TODO(백엔드/인증): 서버 세션/리프레시 토큰이 있다면 여기서 무효화 API 호출
  auth.logout()
}
</script>

<template>
  <header class="sticky top-0 z-50 glass-effect">
    <div class="mx-auto max-w-6xl px-6">
      <div class="h-14 flex items-center justify-between">
        <!-- 브랜드 영역 -->
        <RouterLink to="/" class="text-base font-semibold tracking-tight hover:opacity-80 transition-opacity">
          Lunch Jackpot
        </RouterLink>

        <!-- 섹션 네비게이션 -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink to="/explore" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">탐색</RouterLink>
          <RouterLink to="/rooms/new" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">방 만들기</RouterLink>
          <RouterLink to="/me" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">마이</RouterLink>
        </nav>

        <!-- 액션 영역 -->
        <div class="flex items-center gap-4">
          <!-- 포인트 요약(로그인 시) -->
          <div v-if="isAuthed" class="hidden sm:flex items-center px-3 py-1 rounded-full border border-gray-200 text-sm">
            <span class="font-semibold">{{ auth.points.toLocaleString() }}</span>
            <span class="ml-1 text-gray-500">P</span>
          </div>

          <button
            v-if="!isAuthed"
            type="button"
            class="btn-primary"
            @click="onClickLogin"
          >
            Google로 시작
          </button>

          <button
            v-else
            type="button"
            class="btn-secondary"
            @click="onClickLogout"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* AppTopNav는 tailwind class 기반으로 스타일링합니다.
   Tailwind가 아직 설치되지 않았다면, 설치 후 정상적으로 반영됩니다. */
</style>
