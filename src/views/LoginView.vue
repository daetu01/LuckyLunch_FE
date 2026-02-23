<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const redirectTo = computed(() => {
  const q = route.query.redirect
  return typeof q === 'string' && q.length > 0 ? q : '/me'
})

const isAuthed = computed(() => auth.isAuthenticated)

async function onClickGoogleLogin() {
  await auth.startGoogleLogin()
  await router.replace(redirectTo.value)
}

onMounted(async () => {
  if (isAuthed.value) {
    await router.replace(redirectTo.value)
  }
})
</script>

<template>
  <section class="min-h-screen bg-gray-50/50">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <div class="max-w-md">
        <h2 class="text-2xl font-semibold">로그인</h2>
        <p class="mt-1 text-sm text-gray-600">계속하려면 로그인하세요.</p>

        <div class="mt-6 apple-card">
          <div class="p-6">
            <button type="button" class="btn-primary w-full" @click="onClickGoogleLogin">
              Google로 로그인
            </button>
            <p class="mt-3 text-xs text-gray-500">
              현재는 데모 로그인입니다. 백엔드 연동 후 실제 OAuth로 교체하세요.
            </p>

            <RouterLink to="/" class="mt-6 inline-block text-sm text-gray-600 hover:text-gray-900">
              홈으로
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
