import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database';
import { badRequest, unauthorized } from '../middleware/AppError';

const router = Router();

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(badRequest('Email and password are required'));
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as
    | { id: number; name: string; email: string; password: string }
    | undefined;

  if (!user) {
    return next(unauthorized('Invalid email or password'));
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return next(unauthorized('Invalid email or password'));
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );

  res.json({ token });
});

export default router;
