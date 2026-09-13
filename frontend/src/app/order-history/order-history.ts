import { Component, inject, signal } from '@angular/core';
import { OrderService, OrderHistoryRow } from '../services/order';

export interface GroupedOrder {
  order_id: number;
  created_at: string;
  status: string;
  items: { product_name: string; quantity: number; price: number }[];
}

@Component({
  imports: [],
  selector: 'app-order-history',
  styleUrl: './order-history.css',
  templateUrl: './order-history.html',
})
export class OrderHistory {
  private orderService = inject(OrderService);
  orders = signal<GroupedOrder[]>([]);

  ngOnInit() {
    this.orderService.getOrderHistory().subscribe((rows) => {
      this.orders.set(this.groupOrders(rows));
    });
  }

  private groupOrders(rows: OrderHistoryRow[]): GroupedOrder[] {
    const grouped = new Map<number, GroupedOrder>();

    for (const row of rows) {
      if (!grouped.has(row.order_id)) {
        grouped.set(row.order_id, {
          order_id: row.order_id,
          created_at: row.created_at,
          status: row.status,
          items: [],
        });
      }

      grouped.get(row.order_id)!.items.push({
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.price,
      });
    }

    return Array.from(grouped.values());
  }
}
