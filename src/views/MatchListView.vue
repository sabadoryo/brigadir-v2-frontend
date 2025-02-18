<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface Match {
  _id: string
  game: string
  teamA: { _id: string; name: string }
  teamB: { _id: string; name: string }
  winner?: { _id: string; name: string }
  status: string
  startTime: string
  endTime?: string
}

const matches = ref<Match[]>([
  {
    _id: 'match1',
    game: 'valorant',
    teamA: { _id: 'teamA', name: 'teamA' },
    teamB: { _id: 'teamB', name: 'teamB' },
    winner: { _id: 'teamA', name: 'teamA' },
    status: 'ended',
    startTime: '19:20',
    endTime: '20:01',
  },
  {
    _id: 'match2',
    game: 'valorant',
    teamA: { _id: 'team1', name: 'team1' },
    teamB: { _id: 'team2', name: 'team2' },
    winner: { _id: 'team2', name: 'team2' },
    status: 'ended',
    startTime: '16:20',
    endTime: '16:55',
  },
])
const router = useRouter()

// const fetchMatches = async () => {
//   try {
//     const response = await axios.get<Match[]>('/api/matches')
//     matches.value = response.data
//   } catch (error) {
//     console.error('Error fetching matches', error)
//   }
// }

const goToMatch = (id: string) => {
  router.push({ path: `/matchlist/${id}` })
}

// onMounted(fetchMatches)
</script>

<template>
  <DataTable :value="matches" responsiveLayout="scroll">
    <Column field="game" header="Game"></Column>
    <Column field="teamA.name" header="Team A"></Column>
    <Column field="teamB.name" header="Team B"></Column>
    <Column field="status" header="Status"></Column>
    <Column field="startTime" header="Start Time"></Column>
    <Column field="endTime" header="End Time"></Column>
    <Column>
      <template #body="{ data }">
        <Button label="View" @click="goToMatch(data._id)" />
      </template>
    </Column>
  </DataTable>
</template>
