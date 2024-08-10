import { Request, Response, NextFunction } from "express";

// error handling middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // determine the status code based on the error
  const statusCode = err.statusCode || 500;

  // send a JSON response with error details
  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    // optionally include error details for debugging in development
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};

export default errorHandler;
