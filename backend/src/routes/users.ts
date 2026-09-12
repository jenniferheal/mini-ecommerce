import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../database';
import { badRequest, conflict } from '../middleware/AppError';

const router = Router();

router.post('/', async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(badRequest('Name, email, and password are all required'));
  }

  const existingUser = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get(email);

  if (existingUser) {
    return next(conflict('Email already in use'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = db
    .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
    .run(name, email, hashedPassword);

  res.status(201).json({ id: result.lastInsertRowid, name, email });
});

export default router;
