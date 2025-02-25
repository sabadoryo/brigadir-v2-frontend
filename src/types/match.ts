export interface Match {
  _id: string
  game: string
  hostId: string
  distributionType: string,
  playerAmount: number
  teamA: string[]
  teamB: string[]
  winner?: { _id: string; name: string }
  status: string
  startTime?: string
  endTime?: string
}