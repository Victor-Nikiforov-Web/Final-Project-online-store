import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDetail } from '../models/cart-detail';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public myApi = 'http://localhost:3000/api/shopping/';
  constructor(private http: HttpClient) { }

  public createCart(_id: any) {
    return this.http.post(this.myApi + "create-cart", _id);
  }
  public addProductToCart(product: CartDetail): Observable<CartDetail> {
    return this.http.post<CartDetail>(this.myApi + "add-product", product);
  }
  public getAllProducts(cartId: any): Observable<CartDetail[]> {
    return this.http.post<CartDetail[]>(this.myApi + "get-all-products", cartId);
  }
  public updateProduct(product: CartDetail): Observable<CartDetail> {
    return this.http.put<CartDetail>(this.myApi + "update-product", product);
  }
  public removeFromCart(_id: string) {
    return this.http.delete(this.myApi + "remove-product/" + _id);
  }
  public getTotalPrice(shoppingCartProducts: CartDetail[]) {
    let number: number = 0;
    shoppingCartProducts.map(p => number += p.price);
    return number;
  }
  public deleteCart(cart: Cart) {
    return this.http.delete(this.myApi + "delete-cart/" + cart._id);
  }
}
