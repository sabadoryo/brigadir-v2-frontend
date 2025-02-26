export const API_ENDPOINTS = {
  matches: {
    matches: () => `/matches`,
    match: (matchId: string) => `/matches/${matchId}`,
    joinTeam: (matchId: string) => `/matches/${matchId}/join`,
    leaveTeam: (matchId: string) => `/matches/${matchId}/leave`,
    start: (matchId: string) => `/matches/${matchId}/start`,
    end: (matchId: string) => `/matches/${matchId}/end`,
  },
  players: {
    playerByUsername: (username: string) => `/players/${username}`,
  },
}
