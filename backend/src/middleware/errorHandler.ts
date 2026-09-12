import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Something went wrong' });
}