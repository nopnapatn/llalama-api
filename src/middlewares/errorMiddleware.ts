import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/errorHandler"

export default (e: any, req: Request, res: Response, next: NextFunction) => {
  e.statusCode = e.statusCode || 500
  e.message = e.message || "Internal server error"

  if (e.name === "CastError") {
    const message = `Resource not found with this ID. Invalid ${e.path}`
    e = new ErrorHandler(message, 400)
  }

  if (e.code === 11000) {
    const message = `Duplicate ${Object.keys(e.keyValue)} entered`
    e = new ErrorHandler(message, 400)
  }

  if (e.name === "JsonWebTokenError") {
    const message = `Your URL is invalid. Please try again`
    e = new ErrorHandler(message, 400)
  }

  if (e.name === "TokenExpiredError") {
    const message = `Your URL has expired. Please try again`
    e = new ErrorHandler(message, 400)
  }

  res.status(e.statusCode).json({
    success: false,
    message: e.message,
  })
}
