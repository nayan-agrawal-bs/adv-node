import { NextFunction, Request, Response } from 'express';
import { ApiError, BadRequestError } from 'errors';

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(error); // Pass the error to the default Express error handler
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).send(error.toJson());
  }

  const badRequest = new BadRequestError(error.message, []);
  return res.status(badRequest.statusCode).send(badRequest.toJson());
}
