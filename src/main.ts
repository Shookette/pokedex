import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(VueApexCharts)
app.use(pinia)

app.mount('#app')
