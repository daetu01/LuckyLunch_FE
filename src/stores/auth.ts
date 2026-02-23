import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
// 인증/유저 상태를 관리하는 Pinia Store입니다.
// - 지금은 "프론트 스텁"(mock) 형태로만 구현되어 있습니다.
// - 백엔드를 붙일 때는 아래 TODO 주석을 따라 API 연동으로 교체하세요.

export type AuthUser = {
  id: string
  name: string
  email?: string
  avatarUrl?: string
}

export const useAuthStore = defineStore('auth', () => {
  // 서버 세션 기반이면: 서버에서 /me 같은 API로 유저 정보를 불러와서 세팅
  const user = ref<AuthUser | null>(null)

  // 포인트는 실제로는 백엔드에서 관리/정산될 값
  const points = ref<number>(0)

  const isAuthenticated = computed(() => user.value !== null)

  const data = ref(null); 
  async function startGoogleLogin() {
    // TODO(백엔드/인증):
    // 1) 백엔드가 제공하는 OAuth 시작 URL로 이동 (예: window.location.href = `${API_BASE}/auth/google`)
    // 2) 또는 구글 SDK로 id_token을 발급받아 백엔드에 전달 후 세션/토큰을 교환
    // 현재는 데모를 위해 가짜 로그인 처리를 합니다.
    
    // 소셜 로그인 페이지로 이동시켜야 하므로 
    window.location.href = 'http://localhost:8080/api/auth/google'
    // TODO(포인트): 백엔드에서 출석 체크/데일리 포인트 지급 로직을 수행한 뒤 결과를 반영
    points.value = 1200
  }

  function logout() {
    // TODO(백엔드/인증):
    // - 세션 기반이면: /logout 호출
    // - 토큰 기반이면: 저장된 토큰 삭제 + 필요 시 서버에 revoke 요청
    user.value = null
    points.value = 0
  }

  return {
    user,
    points,
    isAuthenticated,
    startGoogleLogin,
    logout,
  }
})
