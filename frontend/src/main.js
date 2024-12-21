import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/global.scss'

const app = createApp(App)

// 初始化主题
store.dispatch('theme/initTheme')

app.use(router)
app.use(store)
app.mount('#app') 