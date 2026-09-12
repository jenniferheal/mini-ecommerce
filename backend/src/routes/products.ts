import { Router } from 'express';
import db from '../database';

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

export default router;