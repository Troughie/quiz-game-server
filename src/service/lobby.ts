import { LobbyRepository } from "../repository/lobby";

export const LobbyService = {
  async submitPin(pin: string): Promise<string> {
    const title = await LobbyRepository.getPinTitle(pin);

    if (!title) {
      throw new Error("Invalid pin");
    }

    return title;
  },
};
