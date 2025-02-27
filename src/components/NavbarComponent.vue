<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/stores/authStore'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/locales'

const { locale } = useI18n()
const router = useRouter()
const authStore = useAuth()
const activeItem = ref('home')
const { t } = i18n.global

const menuItems = computed(() => [
  { label: t('menuItems.home'), icon: 'pi pi-fw pi-home', name: 'home' },
  { label: t('menuItems.matches'), icon: 'pi pi-fw pi-list', name: 'matches' },
  { label: t('menuItems.profile'), icon: 'pi pi-fw pi-user', name: 'profile' },
])

const updateActiveItem = () => {
  const route = router.currentRoute.value.path
  if (route.includes('/home')) activeItem.value = 'home'
  else if (route.includes('/matches')) activeItem.value = 'matches'
  else if (route.includes(`/players/${authStore.user.username}`)) activeItem.value = 'profile'
  else activeItem.value = ''
}

const changeLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
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

    <div class="flex gap-3 align-items-center">
      <PrimeButton
        severity="secondary"
        label="EN"
        @click="changeLanguage('en')"
        :class="{ selected: locale === 'en' }"
      />
      <PrimeButton
        severity="secondary"
        label="РУС"
        @click="changeLanguage('ru')"
        :class="{ selected: locale === 'ru' }"
      />
      <PrimeButton class="ml-4" :label="$t('buttons.logout')" icon="pi pi-sign-out" @click="logout" />
    </div>
  </div>
</template>

<style scoped>
.p-menuitem {
  text-decoration: none;
  color: var(--text-color);
  font-size: 1.1rem;
}
.selected {
  background-color: #6366f1 !important;
  color: white !important;
  border: 1px solid #4f46e5 !important;
}
</style>
