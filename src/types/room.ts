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
  status: "waiting" | "playing" | "finished";
  isWhiteList?: boolean;
  createdAt: Date;
}
