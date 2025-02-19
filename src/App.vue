<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import { useAuth } from './stores/authStore'

const authStore = useAuth()
</script>

<template>
  <div class="min-h-screen flex flex-column">
    <NavbarComponent v-if="authStore.token" />
    <RouterView />
  </div>
</template>
