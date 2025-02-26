<script setup lang="ts">
import { onMounted, ref } from 'vue'
import apiClient from '@/utils/axiosInstance'
import { useRoute } from 'vue-router'
import type { Player } from '@/types/player'

const user = ref<Player>()
const route = useRoute()
const loading = ref(false)

async function getUser() {
  try {
    loading.value = true
    const { data } = await apiClient.get(`/players/${route.params.username}`)
    user.value = data
    if (user.value) {
      user.value.avatar = `https://cdn.discordapp.com/avatars/${user.value.discordId}/${user.value?.avatar}.png`
    }
  } catch (error) {
    console.error('Error fetching user', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getUser()
})
</script>

<template>
  <div class="flex justify-content-center p-4">
    <div class="surface-card p-4 shadow-2 border-round w-full sm:w-30rem">
      <div class="flex flex-column align-items-center">
        <PrimeAvatar
          :image="user.avatar"
          shape="circle"
          size="xlarge"
          class="mb-3"
          v-if="user?.avatar"
        />
        <PrimeSkeleton shape="circle" size="4rem" class="mb-4" v-else />
        <h2 class="text-xl font-bold" v-if="user?.username">{{ user?.username }}</h2>
        <PrimeSkeleton width="10rem" height="1.5rem" v-else/>
      </div>

      <div class="flex justify-content-between mt-4">
        <PrimeButton label="Редактировать профиль" icon="pi pi-pencil" class="p-button-outlined" />
      </div>
    </div>
  </div>
</template>
