<script setup lang="ts">
import { matchService } from '@/api/services/matchService'
import LobbyTeamComponent from '@/components/LobbyTeamComponent.vue'
import type { Match } from '@/types/match'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(false)
const match = ref<Match | null>(null)

const matchId = Array.isArray(route.params.matchId) ? route.params.matchId[0] : route.params.matchId
const fetchMatch = async () => {
  try {
    loading.value = true

    const response = await matchService.getMatch(matchId)
    match.value = response.data
  } catch (error) {
    console.error('Error fetching match', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchMatch()
})
</script>

<template>
  <div class="">
    <h1 class="text-center">Game Lobby</h1>
    <div class="flex justify-content-between" v-if="match">
      <LobbyTeamComponent
        :team="match.teamA"
        teamName="teamA"
        :distributionType="match.distributionType"
      />
      <LobbyTeamComponent
        :team="match.teamB"
        teamName="teamB"
        :distributionType="match.distributionType"
      />
    </div>
    <div v-else>asd</div>
  </div>
</template>

<style scoped>
.teams {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>
