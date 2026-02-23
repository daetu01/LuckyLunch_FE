import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from 'ㅅ ./router'

// Global styles (Tailwind를 설치/연결하면 이 파일이 전체 스타일 엔트리가 됩니다)
import './style.css'

const app = createApp(App)

// Global state
app.use(createPinia())

// SPA routing
app.use(router)

app.mount('#app')
