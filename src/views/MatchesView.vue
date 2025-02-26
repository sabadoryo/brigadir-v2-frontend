<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { matchService } from '@/api/services/matchService'
import type { Match } from '@/types/match'
import { MatchStatusesEnum } from '@/constants/match-statuses.enum'
import CreateMatchModal from '@/components/CreateMatchModal.vue'
import {
  distributionTypeOptions,
  gameOptions,
  matchStatusOptions,
} from '@/constants/selectOptions/selectOptions'
import paginationConstruct from '@/helpers/paginationConstruct'

const matches = ref<Match[]>([])
const router = useRouter()
const loading = ref(false)

const createMatchModalOpen = ref(false)
const pagination = ref(paginationConstruct())

import type { GamesEnum } from '@/constants/games.enum'
import { DistributionTypesEnum } from '@/constants/distribution-types.enum'

const selectedGame = ref<GamesEnum | undefined>(undefined)
const selectedDistributionType = ref<DistributionTypesEnum | undefined>(undefined)
const selectedStatus = ref<MatchStatusesEnum | undefined>(undefined)

const fetchMatches = async () => {
  try {
    loading.value = true
    const response = await matchService.getMatches(
      pagination.value,
      selectedGame.value,
      selectedStatus.value,
      selectedDistributionType.value,
    )
    console.log(response)
    pagination.value = response.data.pagination
    matches.value = response.data
  } catch (error) {
    console.error('Error fetching matches', error)
  } finally {
    loading.value = false
  }
}

const goToMatch = (id: string, status: MatchStatusesEnum) => {
  if (status === MatchStatusesEnum.CREATED) {
    router.push({ path: `/lobby/${id}` })
    return
  }
  router.push({ path: `/matches/${id}` })
}

const openCreateMatchModal = () => {
  createMatchModalOpen.value = true
}

onMounted(async () => {
  await fetchMatches()
})
</script>

<template>
  <PrimeCard class="shadow-none">
    <template #title>
      <div class="flex align-items-center justify-content-between mb-5">
        <span class="text-xl font-bold">Список матчей</span>
        <PrimeButton label="Создать матч" @click="openCreateMatchModal" />
      </div>
      <div class="flex align-items-center gap-5 mb-5">
        <PrimeSelect
          placeholder="Игра"
          :options="gameOptions"
          v-model="selectedGame"
          showClear
          option-label="label"
          option-value="value"
          class="w-2"
        />
        <PrimeSelect
          placeholder="Статус"
          v-model="selectedStatus"
          :options="matchStatusOptions"
          showClear
          option-label="label"
          option-value="value"
          class="w-2"
        />
        <PrimeSelect
          placeholder="Тип распределения игроков"
          v-model="selectedDistributionType"
          :options="distributionTypeOptions"
          showClear
          option-label="label"
          option-value="value"
          class="w-2"
        />

        <PrimeButton label="Найти" @click="fetchMatches" />
      </div>
    </template>
    <template #content>
      <PrimeDataTable :loading="loading" :value="matches" responsiveLayout="scroll">
        <PrimeColumn field="game" header="Игра"></PrimeColumn>
        <PrimeColumn field="hostId.username" header="Хост"></PrimeColumn>
        <PrimeColumn field="distributionType" header="Тип распределения"></PrimeColumn>
        <PrimeColumn field="teamA.name" header="Команда A"></PrimeColumn>
        <PrimeColumn field="teamB.name" header="Команда B"></PrimeColumn>
        <PrimeColumn field="status" header="Статус"></PrimeColumn>
        <PrimeColumn field="startTime" header="Время начала"></PrimeColumn>
        <PrimeColumn field="endTime" header="Время конца"></PrimeColumn>
        <PrimeColumn>
          <template #body="{ data }">
            <div class="flex justify-content-end">
              <PrimeButton label="Перейти" @click="goToMatch(data._id, data.status)" />
            </div>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
    </template>

    <!-- <template #footer>
      <PrimePaginator
        :rows="pagination.pageSize"
        :total-records="pagination.totalItems"
        @page="pagination.currentPage = $event.page + 1"
        :always-show="false"
      />
    </template> -->
  </PrimeCard>
  <CreateMatchModal
    :open="createMatchModalOpen"
    @close="createMatchModalOpen = false"
    @save="fetchMatches"
  />
</template>
