import { DistributionTypesEnum } from "../distribution-types.enum"
import { GamesEnum } from "../games.enum"
import { MatchStatusesEnum } from "../match-statuses.enum"

export const distributionTypeOptions = [
  { label: 'Рандом', value: DistributionTypesEnum.RANDOM },
  { label: 'По рейтингу', value: DistributionTypesEnum.EQUAL },
  { label: 'Вручную', value: DistributionTypesEnum.MANUAL },
]

export const gameOptions = [
  { label: 'Валорант', value: GamesEnum.VALORANT },
  { label: 'Дота 2', value: GamesEnum.DOTA2 },
  { label: 'Кс 2', value: GamesEnum.CS2 },
]

export const matchStatusOptions = [
  { label: 'Созданные', value: MatchStatusesEnum.CREATED },
  { label: 'Активные', value: MatchStatusesEnum.ACTIVE },
  { label: 'Отмененные', value: MatchStatusesEnum.CANCELED },
  { label: 'Завершенные', value: MatchStatusesEnum.FINISHED },
]