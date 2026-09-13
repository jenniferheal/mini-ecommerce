import { Service, signal } from '@angular/core';
import { ProductModel } from './product';

export interface CartItem {
  product: ProductModel;
  quantity: number;
}

@Service()
export class CartService {
  items = signal<CartItem[]>([]);

  addItem(product: ProductModel, quantity: number) {
    const currentItems = this.items();
    const existingItem = currentItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.items.set([...currentItems]);
    } else {
      this.items.set([...currentItems, { product, quantity }]);
    }
  }

  clearCart() {
    this.items.set([]);
  }
}
