import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { LobbyService } from "../service/lobby";

export const LobbyController = {
  submitPin: asyncHandler(async (req: Request, res: Response) => {
    const { pin } = req.body;

    const title = await LobbyService.submitPin(pin);

    res.status(200).json({ title });
  }),
};
