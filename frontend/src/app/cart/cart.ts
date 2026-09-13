import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  cartService = inject(CartService);
}
