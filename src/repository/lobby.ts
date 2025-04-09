import client from "../db/init.redis";
export const LobbyRepository = {
  async getPinTitle(pin: string): Promise<string | null> {
    return await client.get(pin);
  },
};
