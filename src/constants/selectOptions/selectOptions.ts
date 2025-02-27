import { i18n } from '@/locales'
import { DistributionTypesEnum } from '../distribution-types.enum'
import { GamesEnum } from '../games.enum'
import { MatchStatusesEnum } from '../match-statuses.enum'

const { t } = i18n.global

export const getDistributionTypeOptions = () => [
  { label: t('distributionTypes.random'), value: DistributionTypesEnum.RANDOM },
  { label: t('distributionTypes.equal'), value: DistributionTypesEnum.EQUAL },
  { label: t('distributionTypes.manual'), value: DistributionTypesEnum.MANUAL },
]

export const getGameOptions = () => [
  { label: t('games.valorant'), value: GamesEnum.VALORANT },
  { label: t('games.dota2'), value: GamesEnum.DOTA2 },
  { label: t('games.cs2'), value: GamesEnum.CS2 },
]

export const getMatchStatusOptions = () => [
  { label: t('matchStatuses.created'), value: MatchStatusesEnum.CREATED },
  { label: t('matchStatuses.active'), value: MatchStatusesEnum.ACTIVE },
  { label: t('matchStatuses.canceled'), value: MatchStatusesEnum.CANCELED },
  { label: t('matchStatuses.finished'), value: MatchStatusesEnum.FINISHED },
]
