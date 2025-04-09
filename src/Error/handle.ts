import { Request, Response, NextFunction } from "express";

// Middleware xử lý lỗi chung
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // In lỗi ra console để debug

  const statusCode = err.statusCode || 500;
  const message = err.message || "Lỗi server!";

  res.status(statusCode).json({
    success: false,
    message,
    time: new Date(),
  });
};
