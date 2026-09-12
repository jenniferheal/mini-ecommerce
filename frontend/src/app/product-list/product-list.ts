import { Component, inject, signal } from '@angular/core';
import { Product, ProductModel } from '../services/product';

@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  private productService = inject(Product);
  products = signal<ProductModel[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }
}
