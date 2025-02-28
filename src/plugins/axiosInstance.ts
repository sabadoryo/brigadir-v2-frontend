import axios from 'axios'
import { useAuth } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuth()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuth()
      authStore.logout()
      const router = useRouter()
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default apiClient
