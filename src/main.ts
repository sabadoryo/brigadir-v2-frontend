import './assets/main.css'
import '/node_modules/primeflex/primeflex.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import { ProgressSpinner, Toast } from 'primevue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.component('Button', Button)
app.component('ProgressSpinner', ProgressSpinner)
app.component('Toast', Toast)
app.use(ToastService)
app.use(createPinia())
app.use(router)

app.mount('#app')
