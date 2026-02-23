import { createRouter, createWebHistory } from 'vue-router'

// 라우팅 정책
// - 화면(View)은 /src/views 아래에 둡니다.
// - 백엔드가 준비되기 전에도 프론트 UI 플로우를 확인할 수 있도록
//   현재는 대부분 "데모/placeholder" 데이터를 사용합니다.

import LandingView from '@/views/LandingView.vue'
import ExploreView from '@/views/ExploreView.vue'
import RoomCreateView from '@/views/RoomCreateView.vue'
import RoomJoinView from '@/views/RoomJoinView.vue'
import RoomDashboardView from '@/views/RoomDashboardView.vue'
import MeView from '@/views/MeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 랜딩(애플 스타일 히어로)
    { path: '/', name: 'landing', component: LandingView },

    // 위치 기반 식당 탐색(좌 리스트/우 지도)
    { path: '/explore', name: 'explore', component: ExploreView },

    // 방 만들기(옵션 설정)
    { path: '/rooms/new', name: 'room-create', component: RoomCreateView },

    // 방 참여(베팅 진행) - 공유 링크
    { path: '/rooms/:roomId', name: 'room-join', component: RoomJoinView },

    // 대시보드(실시간 현황/결과)
    { path: '/rooms/:roomId/dashboard', name: 'room-dashboard', component: RoomDashboardView },

    // 마이(포인트/프로필)
    { path: '/me', name: 'me', component: MeView },
  ],

  // 애플 랜딩 느낌을 위해 라우트 전환 시 스크롤을 상단으로
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
