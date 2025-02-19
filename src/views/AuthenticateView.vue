<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '@/stores/authStore'
import axios, { AxiosError, isAxiosError } from 'axios'

const router = useRouter()
const authStore = useAuth()
const toast = useToast()
const code = new URLSearchParams(window.location.search).get('code')

const getUserInfo = async (token: string) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/matches`, {
      headers: { Authorization: `Bearer ${token}` },
    }) 
    
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  console.log('mounted')
  if (!code) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Код авторизации отсутствует',
      life: 3000,
    })
    router.push('/')
    return
  }

  try {
    const requestData = new URLSearchParams({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      client_secret: import.meta.env.VITE_DISCORD_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: import.meta.env.VITE_DISCORD_REDIRECT_URL,
    }).toString()

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    console.log(requestData)
    const { data } = await axios.post('https://discord.com/api/oauth2/token', requestData, {
      headers,
    })

    authStore.authenticate(data)
    await getUserInfo(data.access_token)

    router.push('/')
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: error?.response?.data?.error || 'Не удалось авторизоваться',
        life: 3000,
      })
    } else {
      throw error
    }
  }
})
</script>

<template>
  <div class="flex justify-content-center align-items-center h-screen">
    <ProgressSpinner />
    <Toast />
  </div>
</template>
