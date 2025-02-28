<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@/stores/authStore'

const authStore = useAuth()

const getAvatar = () => {
  return `https://cdn.discordapp.com/avatars/${authStore.user.discordId}/${authStore.user?.avatar}.png`
}

onMounted(async () => {})
</script>

<template>
  <div class="flex justify-content-center p-4">
    <div class="surface-card p-4 shadow-2 border-round w-full sm:w-30rem">
      <div class="flex flex-column align-items-center">
        <PrimeAvatar
          :image="getAvatar()"
          shape="circle"
          size="xlarge"
          class="mb-3"
          v-if="getAvatar()"
        />
        <PrimeSkeleton shape="circle" size="4rem" class="mb-4" v-else />
        <h2 class="text-xl font-bold" v-if="authStore?.user?.username">
          {{ authStore?.user?.username }}
        </h2>
        <PrimeSkeleton width="10rem" height="1.5rem" v-else />
      </div>

      <div class="flex justify-content-between mt-4">
        <PrimeButton :label="$t('profile.edit')" icon="pi pi-pencil" class="p-button-outlined" />
      </div>
    </div>
  </div>
</template>
