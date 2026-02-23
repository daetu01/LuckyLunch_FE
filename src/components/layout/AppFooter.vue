<script setup lang="ts">
// Footer는 애플 랜딩 페이지처럼 “간결한 정보 + 정책 링크” 영역을 담당합니다.
// TODO(추후): 개인정보처리방침/이용약관/문의 메일 등을 실제 링크로 교체하세요.
</script>

<template>
  <footer class="border-t border-gray-100 bg-white">
    <div class="mx-auto max-w-6xl px-6 py-12">
      <div class="grid md:grid-cols-3 gap-8 mb-10">
        <!-- 브랜드 -->
        <div class="space-y-3">
          <div class="text-base font-semibold">Lunch Jackpot</div>
          <p class="text-sm text-gray-600 leading-relaxed">
            위치 기반 식당 후보군에 포인트를 베팅하고 점심 메뉴를 결정하세요.
          </p>
        </div>

        <!-- 링크 -->
        <div class="space-y-3">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">서비스</div>
          <div class="flex flex-col gap-2">
            <RouterLink to="/explore" class="text-sm text-gray-600 hover:text-blue-500 transition-colors">탐색하기</RouterLink>
            <RouterLink to="/rooms/new" class="text-sm text-gray-600 hover:text-blue-500 transition-colors">방 만들기</RouterLink>
            <RouterLink to="/me" class="text-sm text-gray-600 hover:text-blue-500 transition-colors">마이페이지</RouterLink>
          </div>
        </div>

        <!-- 정책 -->
        <div class="space-y-3">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider">정책</div>
          <div class="flex flex-col gap-2">
            <a href="#" class="text-sm text-gray-600 hover:text-blue-500 transition-colors">이용약관</a>
            <a href="#" class="text-sm text-gray-600 hover:text-blue-500 transition-colors">개인정보처리방침</a>
            <a href="#" class="text-sm text-gray-600 hover:text-blue-500 transition-colors">문의하기</a>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="text-xs text-gray-500">
          © {{ new Date().getFullYear() }} Lunch Jackpot. All rights reserved.
        </div>
        <div class="text-xs text-gray-400">v0</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 디자인은 전역 Tailwind 유틸리티 클래스 중심입니다. */
</style>
