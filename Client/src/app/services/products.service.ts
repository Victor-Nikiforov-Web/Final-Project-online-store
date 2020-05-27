import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public myApi = 'http://localhost:3000/api/products/';
  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.myApi + "get-all-products");
  }
  public searchProduct(name: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.myApi + "search-product/" + name);
  }
}
