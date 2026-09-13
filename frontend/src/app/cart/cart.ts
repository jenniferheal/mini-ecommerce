import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart';
import { OrderService } from '../services/order';
import { Auth } from '../services/auth';

@Component({
  imports: [],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private authService = inject(Auth);
  private router = inject(Router);
  errorMessage = signal('');

  checkout() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.orderService.placeOrder(this.cartService.items()).subscribe({
      next: (response) => {
        this.cartService.items.set([]);
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage.set('Failed to place order. Please try again.');
      },
    });
  }
}
