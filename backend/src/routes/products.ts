import { Router } from 'express';
import db from '../database';
import { notFound } from '../middleware/AppError';

const router = Router();

router.get('/', (req, res) => {
  const products = db.prepare(`
    SELECT products.id, products.name, products.price, products.description,
           categories.name AS category
    FROM products
    JOIN categories ON products.category_id = categories.id
  `).all();

  res.json(products);
});

router.get('/:id', (req, res, next) => {
  const product = db.prepare(`
    SELECT products.id, products.name, products.price, products.description,
           categories.name AS category
    FROM products
    JOIN categories ON products.category_id = categories.id
    WHERE products.id = ?
  `).get(req.params.id);

  if (!product) {
    return next(notFound('Product not found'));
  }

  res.json(product);
});

export default router;