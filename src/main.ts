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
import {
  AutoComplete,
  Avatar,
  Card,
  Checkbox,
  DatePicker,
  Dialog,
  InputNumber,
  InputText,
  Menubar,
  MultiSelect,
  Paginator,
  ProgressSpinner,
  Select,
  Skeleton,
  Textarea,
  Toast,
  ToggleSwitch,
} from 'primevue'
import DataView from 'primevue/dataview'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import { i18n } from './locales'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.component('PrimeButton', Button)
app.component('PrimeProgressSpinner', ProgressSpinner)
app.component('PrimeToast', Toast)
app.component('PrimeDataView', DataView)
app.component('PrimeDataTable', DataTable)
app.component('PrimeColumn', Column)
app.component('PrimeColumnGroup', ColumnGroup)
app.component('PrimeRow', Row)
app.component('PrimeMenubar', Menubar)
app.component('PrimeAvatar', Avatar)
app.component('PrimeSkeleton', Skeleton)
app.component('PrimeDialog', Dialog)
app.component('PrimeSelect', Select)
app.component('PrimeInputText', InputText)
app.component('PrimeInputNumber', InputNumber)
app.component('PrimeCheckbox', Checkbox)
app.component('PrimeToggleSwitch', ToggleSwitch)
app.component('PrimeMultiSelect', MultiSelect)
app.component('PrimeAutoComplete', AutoComplete)
app.component('PrimeDatePicker', DatePicker)
app.component('PrimeTextarea', Textarea)
app.component('PrimeCard', Card)
app.component('PrimePaginator', Paginator)

app.use(ToastService)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
