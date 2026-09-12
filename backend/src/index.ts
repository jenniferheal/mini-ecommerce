import 'dotenv/config';
import express from 'express';
import './database';
import productsRouter from './routes/products';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import { requireAuth, AuthRequest } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
