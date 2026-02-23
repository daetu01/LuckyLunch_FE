<script setup lang="ts">
import { RouterView } from 'vue-router'

// NOTE:
// - 여기서는 “애플 홈페이지 느낌”의 공통 레이아웃(헤더/푸터)을 담당합니다.
// - 실제 화면(랜딩/탐색/방/대시보드 등)은 router-view로 교체 렌더링됩니다.
import AppTopNav from '@/components/layout/AppTopNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- 공통 헤더(로그인 버튼/메뉴 등) -->
    <AppTopNav />

    <!--
      메인 컨텐츠 영역
      - 각 페이지는 /src/views 아래에 위치
      - 라우팅은 /src/router/index.ts 에서 정의
    -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- 공통 푸터(서비스 소개/링크/정책 등) -->
    <AppFooter />
  </div>
</template>

<style scoped>
/*
  App.vue는 레이아웃만 담당합니다.
  페이지별 스타일은 각 view(페이지) 컴포넌트 또는 전역 style.css에서 관리합니다.
*/
</style>
