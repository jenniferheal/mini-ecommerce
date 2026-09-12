import { Router } from 'express';
import db from '../database';
import { badRequest, conflict } from '../middleware/AppError';

const router = Router();

router.post('/', (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(badRequest('Name, email, and password are all required'));
  }

  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

  if (existingUser) {
    return next(conflict('Email already in use'));
  }

  const result = db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  ).run(name, email, password);

  res.status(201).json({ id: result.lastInsertRowid, name, email });
});

export default router;