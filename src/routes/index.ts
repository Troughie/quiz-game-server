import { Router } from "express";
import loobyRouter from "./looby";
const router = Router();

// API v1 routes
router.use("/", (req, res, next) => {
  // Add version header
  res.setHeader("X-API-Version", "1.0");
  next();
});

router.use("/lobby", loobyRouter);

export default router;
