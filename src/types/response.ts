import { Response } from "express";

export interface ResponseBase<T> {
  success: boolean;
  message?: string;
  data: T;
  time: Date;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  status?: number,
  message?: string
) => {
  res.status(status || 200).json({
    success: true,
    message: message || "Success",
    data,
    time: new Date(),
  } as ResponseBase<T>);
};
