import { STATUS_ROOM } from "../constant";
export interface Player {
  socketId?: string;
  id: string;
  name: string;
  avatar?: string;
  score: number;
}

export interface Room {
  id: string;
  host: Player;
  players: Player[];
  status: STATUS_ROOM;
  isWhiteList?: boolean;
  createdAt: Date;
}
