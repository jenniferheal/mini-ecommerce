import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductModel } from '../services/product';

@Component({
  imports: [],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(Product);
  product = signal<ProductModel | null>(null);
  notFound = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProduct(Number(id)).subscribe({
        next: (data) => this.product.set(data),
        error: () => this.notFound.set(true),
      });
    }
  }
}
