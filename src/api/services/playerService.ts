import apiClient from '@/utils/axiosInstance'
import { API_ENDPOINTS } from '../endpoints'

export const playerService = {
  async getPlayerByUsername(username: string) {
    return apiClient.get(API_ENDPOINTS.players.playerByUsername(username))
  },
}
