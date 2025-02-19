<script setup lang="ts">
// import { ref } from 'vue'

// const isLoggedIn = ref(false)

// Перенаправление на страницу авторизации Discord
const redirectToDiscord = () => {
  const discordOAuthURL = `https://discord.com/oauth2/authorize?client_id=${import.meta.env.VITE_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_DISCORD_REDIRECT_URL)}&response_type=code&scope=identify`
  window.location.href = discordOAuthURL
}
</script>

<template>
  <div class="flex justify-content-center align-items-center h-screen">
    <div class="flex flex-column gap-5 align-items-center w-3 shadow-4 p-6 border-round-lg">
      <h2 class="text-4xl font-">Qurultay</h2>
      <PrimeButton
        label="Войти через Discord"
        icon="pi pi-discord"
        class="discord-button"
        @click="redirectToDiscord"
      />
    </div>
  </div>
</template>
