<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/utils/axiosInstance'

interface Match {
  _id: string
  game: string
  hostId: string
  playerAmount: number
  teamA: string[]
  teamB: string[]
  winner?: { _id: string; name: string }
  status: string
  startTime?: string
  endTime?: string
}

const matches = ref<Match[]>([])
const router = useRouter()
const loading = ref(false)

const fetchMatches = async () => {
  try {
    loading.value = true
    const response = await apiClient.get<Match[]>('/matches')
    matches.value = response.data
  } catch (error) {
    console.error('Error fetching matches', error)
  } finally {
    loading.value = false
  }
}

const goToMatch = (id: string) => {
  router.push({ path: `/matchlist/${id}` })
}

onMounted(async () => {
  await fetchMatches()
})
</script>

<template>
  <PrimeDataTable :loading="loading" :value="matches" responsiveLayout="scroll">
    <PrimeColumn field="game" header="Game"></PrimeColumn>
    <PrimeColumn field="hostId" header="Host"></PrimeColumn>
    <PrimeColumn field="teamA.name" header="Team A"></PrimeColumn>
    <PrimeColumn field="teamB.name" header="Team B"></PrimeColumn>
    <PrimeColumn field="status" header="Status"></PrimeColumn>
    <PrimeColumn field="startTime" header="Start Time"></PrimeColumn>
    <PrimeColumn field="endTime" header="End Time"></PrimeColumn>
    <PrimeColumn>
      <template #body="{ data }">
        <div class="flex justify-content-end">
          <PrimeButton label="Go to match" @click="goToMatch(data._id)" />
        </div>
      </template>
    </PrimeColumn>
  </PrimeDataTable>
</template>
