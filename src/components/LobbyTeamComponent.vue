<script setup lang="ts">
import { useAuth } from '@/stores/authStore'
import { defineProps, computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { matchService } from '@/api/services/matchService'
import { useRoute } from 'vue-router'

const authStore = useAuth()

const currentUser = authStore.user.username
const route = useRoute()

const props = defineProps<{
  team: string[] // Массив имен пользователей в команде
  teamName: string // Название команды
  distributionType: string // Тип распределения игроков
}>()

const matchId = Array.isArray(route.params.matchId) ? route.params.matchId[0] : route.params.matchId
const loading = ref(false)

const toast = useToast()

const isInTeam = computed(() => props.team.includes(currentUser))

const paddedTeam = computed(() => {
  return props.team.length < 5 ? [...props.team, ...new Array(5 - props.team.length)] : props.team
})

const joinTeam = async () => {
  if (props.team.length >= 5) {
    toast.add({ severity: 'warn', summary: 'Ошибка', detail: 'Команда уже заполнена', life: 3000 })
    return
  }

  try {
    loading.value = true

    await matchService.joinTeam(matchId)
    toast.add({
      severity: 'info',
      summary: 'Вы вошли',
      detail: 'Вы присоединились к команде',
      life: 3000,
    })
  } catch (error) {
    toast.add({ severity: 'error', summary: `${error}`, detail: 'Не удалось выйти', life: 3000 })
  } finally {
    loading.value = false
  }
}

const leaveTeam = async () => {
  try {
    loading.value = true
    await matchService.leaveTeam(matchId)
    toast.add({ severity: 'info', summary: 'Вы вышли', detail: 'Вы покинули команду', life: 3000 })
  } catch (error) {
    toast.add({ severity: 'error', summary: `${error}`, detail: 'Не удалось выйти', life: 3000 })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-6">
    <div class="w-8 flex flex-column align-items-center gap-3 mx-auto">
      <div
        v-for="(player, index) in paddedTeam"
        :key="index"
        class="player-slot surface-card p-3 border-round-lg shadow-2 w-8"
      >
        <span class="font-bold text-lg text-gray-800" v-if="player">{{ player }}</span>
      </div>
      <template v-if="distributionType === 'MANUAL'">
        <PrimeButton
          v-if="isInTeam"
          :loading="loading"
          label="Покинуть команду"
          class="p-button-danger join-leave-button w-8"
          @click="leaveTeam"
        />
        <PrimeButton
          v-else
          :loading="loading"
          label="Присоединиться"
          class="p-button-success join-leave-button w-8"
          @click="joinTeam"
        />
      </template>
    </div>
  </div>
</template>
<style scoped>
.player-slot {
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--surface-border);
  background: var(--surface-50);
  max-width: 500px;
  height: 50px;
}

.player-slot:hover {
  transform: scale(1.03);
  cursor: pointer;
  box-shadow: var(--shadow-4);
}

.join-leave-button {
  margin-top: 40px;
  max-width: 500px;
}
</style>
