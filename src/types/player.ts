import { GamesEnum } from "@/constants/games.enum";

export interface GameProfile {
  name: GamesEnum;
  rating: number;
  matchesPlayed: number;
}

export interface Player {
  discordId: string;
  username: string;
  avatar?: string;
  gamesProfile: GameProfile[];
  createdAt: string;
  updatedAt: string;
}
