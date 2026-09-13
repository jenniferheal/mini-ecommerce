import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, ProductModel } from '../services/product';
import { CartService } from '../services/cart';

@Component({
  imports: [],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
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

  addToCart() {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addItem(currentProduct, 1);
      console.log(this.cartService.items());
    }
  }
}
