import { Router } from "express";
import { successResponse } from "../types/response";
import { LobbyController } from "../controller/lobby.controller";

const router = Router();

router.get("/create", (req, res) => {
  const { pin } = req.body;
  successResponse(res, pin);
});

router.post("/submit-pin", LobbyController.submitPin);

export default router;
