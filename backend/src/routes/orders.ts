import { Router, Response } from 'express';
import db from '../database';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { badRequest, notFound } from '../middleware/AppError';

const router = Router();

router.post('/', requireAuth, (req: AuthRequest, res: Response, next) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(badRequest('Order must include at least one item'));
  }

  const itemsWithPrices = [];

  for (const item of items) {
    const product = db
      .prepare('SELECT id, price FROM products WHERE id = ?')
      .get(item.product_id) as { id: number; price: number } | undefined;

    if (!product) {
      return next(notFound(`Product with id ${item.product_id} not found`));
    }

    itemsWithPrices.push({
      product_id: product.id,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const userId = req.user!.id;

  const orderResult = db
    .prepare('INSERT INTO orders (user_id) VALUES (?)')
    .run(userId);

  const orderId = orderResult.lastInsertRowid;

  const insertItem = db.prepare(
    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
  );

  for (const item of itemsWithPrices) {
    insertItem.run(orderId, item.product_id, item.quantity, item.price);
  }

  res.status(201).json({ orderId, items: itemsWithPrices });
});

export default router;
