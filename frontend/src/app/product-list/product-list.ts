import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService, ProductModel } from '../services/product';

@Component({
  imports: [RouterLink],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  products = signal<ProductModel[]>([]);

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }
}
