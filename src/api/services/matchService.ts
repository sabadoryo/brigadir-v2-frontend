import apiClient from '@/utils/axiosInstance'
import { API_ENDPOINTS } from '../endpoints'
import type { GamesEnum } from '@/constants/games.enum'
import type { DistributionTypesEnum } from '@/constants/distribution-types.enum'
import paginationRequestParse from '@/helpers/paginationRequestParse'
import paginationConstruct from '@/helpers/paginationConstruct'
import type { MatchStatusesEnum } from '@/constants/match-statuses.enum'

export interface CreateMatchDto {
  name: string
  hostId: string
  playerAmount: number
  game: GamesEnum
  distributionType: DistributionTypesEnum
}

export const matchService = {
  async getMatches(
    pagination = paginationConstruct(),
    game?: GamesEnum,
    status?: MatchStatusesEnum,
    distributionType?: DistributionTypesEnum,
  ) {
    return apiClient.get(API_ENDPOINTS.matches.matches(), {
      params: {
        game,
        status,
        distributionType,
        ...paginationRequestParse(pagination),
      },
    })
  },

  async getMatch(matchId: string) {
    return apiClient.get(API_ENDPOINTS.matches.match(matchId))
  },

  async createMatch(data: CreateMatchDto) {
    return apiClient.post(API_ENDPOINTS.matches.matches(), data)
  },

  async joinTeam(matchId: string) {
    return apiClient.post(API_ENDPOINTS.matches.joinTeam(matchId))
  },

  async leaveTeam(matchId: string) {
    return apiClient.post(API_ENDPOINTS.matches.leaveTeam(matchId))
  },
}
