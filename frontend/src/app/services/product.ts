import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

@Service()
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/products';

  getProducts() {
    return this.http.get<ProductModel[]>(this.apiUrl);
  }

  getProduct(id: number) {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }
}
