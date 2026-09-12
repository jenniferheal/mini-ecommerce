import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from './AppError';

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(unauthorized('No token provided'));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(unauthorized('No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as unknown as {
      id: number;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    return next(unauthorized('Invalid or expired token'));
  }
}
