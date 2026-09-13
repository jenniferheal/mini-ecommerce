import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { Cart } from './cart/cart';
import { Register } from './register/register';
import { Login } from './login/login';
import { OrderHistory } from './order-history/order-history';

export const routes: Routes = [
  { path: 'products', component: ProductList },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'orders', component: OrderHistory },
];
