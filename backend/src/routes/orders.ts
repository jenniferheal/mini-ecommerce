import { Router, Response } from 'express';
import db from '../database';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { badRequest, notFound } from '../middleware/AppError';

const router = Router();

// Create a new order
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

// Get all orders for the authenticated user
router.get('/', requireAuth, (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const rows = db
    .prepare(
      `
    SELECT orders.id AS order_id, orders.created_at, orders.status,
           products.name AS product_name, order_items.quantity, order_items.price
    FROM orders
    JOIN order_items ON order_items.order_id = orders.id
    JOIN products ON products.id = order_items.product_id
    WHERE orders.user_id = ?
    ORDER BY orders.created_at DESC
  `,
    )
    .all(userId);

  res.json(rows);
});

// Get a specific order by ID for the authenticated user
router.get('/:id', requireAuth, (req: AuthRequest, res: Response, next) => {
  const userId = req.user!.id;
  const orderId = req.params.id;

  const rows = db
    .prepare(
      `
    SELECT orders.id AS order_id, orders.created_at, orders.status,
           products.name AS product_name, order_items.quantity, order_items.price
    FROM orders
    JOIN order_items ON order_items.order_id = orders.id
    JOIN products ON products.id = order_items.product_id
    WHERE orders.id = ? AND orders.user_id = ?
  `,
    )
    .all(orderId, userId);

  if (rows.length === 0) {
    return next(notFound('Order not found'));
  }

  res.json(rows);
});

export default router;
