import apiClient from '@/utils/axiosInstance'
import { API_ENDPOINTS } from '../endpoints'

export const matchService = {
  async getMatches() {
    return apiClient.get(API_ENDPOINTS.matches.matches())
  },

  async getMatch(matchId: string) {
    return apiClient.get(API_ENDPOINTS.matches.match(matchId))
  },

  async joinTeam(matchId: string) {
    return apiClient.post(API_ENDPOINTS.matches.joinTeam(matchId))
  },

  async leaveTeam(matchId: string) {
    return apiClient.post(API_ENDPOINTS.matches.leaveTeam(matchId))
  },
}
