import express from 'express';
import './database';
import productsRouter from './routes/products';

const app = express();
const port = 3000;

app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});