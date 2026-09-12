import express from 'express';
import './database';
import productsRouter from './routes/products';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use('/products', productsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});