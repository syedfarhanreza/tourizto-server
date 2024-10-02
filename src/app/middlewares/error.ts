/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import AppError from "../errors/AppError";
const errorMiddleware = (err: any, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new AppError(400, message);
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new AppError(400, message);
  }
  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new AppError(400, message);
  }
  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new AppError(400, message);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
export default errorMiddleware;