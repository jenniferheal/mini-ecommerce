import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart';

interface PlaceOrderPayload {
  items: { product_id: number; quantity: number }[];
}

interface PlaceOrderResponse {
  orderId: number;
  items: { product_id: number; quantity: number; price: number }[];
}

export interface OrderHistoryRow {
  order_id: number;
  created_at: string;
  status: string;
  product_name: string;
  quantity: number;
  price: number;
}

@Service()
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/orders';

  placeOrder(cartItems: CartItem[]) {
    const payload: PlaceOrderPayload = {
      items: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    return this.http.post<PlaceOrderResponse>(this.apiUrl, payload);
  }

  getOrderHistory() {
    return this.http.get<OrderHistoryRow[]>(this.apiUrl);
  }
}
