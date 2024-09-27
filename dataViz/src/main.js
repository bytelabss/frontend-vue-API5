import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueChartKick from 'vue-chartkick'
import 'chartkick/chart.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueChartKick)

app.mount('#app')
