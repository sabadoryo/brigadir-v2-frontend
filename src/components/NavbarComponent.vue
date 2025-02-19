<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuth()
const activeItem = ref('home')

const menuItems = ref([
  { label: 'Главная', icon: 'pi pi-fw pi-home', name: 'home' },
  { label: 'Матчи', icon: 'pi pi-fw pi-list', name: 'matchlist' },
  { label: 'Профиль', icon: 'pi pi-fw pi-user', name: 'profile' },
])

const updateActiveItem = () => {
  const route = router.currentRoute.value.path
  if (route.includes('/home')) activeItem.value = 'home'
  else if (route.includes('/matchlist')) activeItem.value = 'matchlist'
  else activeItem.value = ''
}

watch(() => router.currentRoute.value.path, updateActiveItem, { immediate: true })

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="p-3 shadow-2 surface-card flex align-items-center justify-content-between">
    <div class="flex gap-3">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="
          item.name !== 'profile'
            ? { name: item.name }
            : { name: item.name, params: { username: authStore.user?.username } }
        "
        class="p-menuitem"
        :class="{ 'text-primary': activeItem === item.name }"
        ><span><i :class="item.icon" />{{ item.label }}</span></RouterLink
      >
    </div>

    <PrimeButton label="Выйти" icon="pi pi-sign-out" @click="logout" />
  </div>
</template>

<style scoped>
.p-menuitem {
  text-decoration: none;
  color: var(--text-color);
  font-size: 1.1rem;
}
</style>
