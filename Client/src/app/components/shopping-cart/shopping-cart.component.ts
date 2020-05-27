import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { store } from 'src/app/redux/store';
import { CartDetail } from 'src/app/models/cart-detail';
import { Cart } from 'src/app/models/cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ActionType } from 'src/app/redux/action-type';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public user: UserModel = store.getState().user;
  public shoppingCartOpen: boolean = true;
  public shoppingCartProducts: CartDetail[] = [];
  // use string type for get the cart from localStorage
  public cart: Cart | string;
  public totalPrice: number;
  public cartOption = false;
  public userActive: boolean = false;

  constructor(private myShoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    //get state from redux.
    store.subscribe(() => {
      this.user = store.getState().user;
      this.shoppingCartProducts = store.getState().productsOfCart;
      this.totalPrice = store.getState().totalPrice;
      this.userActive = store.getState().userActive;
      this.cartOption = store.getState().cartOption;
    });
    //-------
    const localCart = localStorage.getItem("myCart");

    setTimeout(() => {
      //  ---- create cart  ----
      if (!this.cart && !localCart) {
        if (this.user) {
          this.createCart();
        }
      }
    }, 5000);
    //if you have cart in localStorage
    if (localCart && !this.userActive) {
      const action = { type: ActionType.updateUserActive, payload: true };
      store.dispatch(action);
      this.cart = JSON.parse(localCart);
      store.dispatch({ type: ActionType.updateCartOption, payload: true });
    }
  }

  public createCart(): void {
    this.myShoppingService.createCart({ _id: this.user._id })
      .subscribe(res => {
        this.cart = res;
        localStorage.setItem("myCart", JSON.stringify(res));
      }, err => alert(err.message));
  }

  public continueShopping(): void {
    // --- get all products of cart ----- //
    const localCart = localStorage.getItem("myCart");
    this.myShoppingService.getAllProducts({ cartId: JSON.parse(localCart)._id })
      .subscribe(res => {
        const action = { type: ActionType.getAllProductsOfCart, payload: res };
        store.dispatch(action);
        store.dispatch({ type: ActionType.updateCartOption, payload: false });
        this.getTotalPrice();
      }, err => alert(err.message));
  }

  public getTotalPrice(): void {
    const totalPrice = this.myShoppingService.getTotalPrice(this.shoppingCartProducts);
    const action = { type: ActionType.updateTotalPrice, payload: totalPrice };
    store.dispatch(action);
  }

  public clearCart(): void {
    const answer = window.confirm("Are you sure?");
    if (!answer) {
      return;
    }
    const myCart: any = this.cart;
    this.myShoppingService.deleteCart(myCart)
      .subscribe(res => {
        localStorage.removeItem("myCart");
        this.createCart();
        store.dispatch({ type: ActionType.updateCartOption, payload: false });
        const action = { type: ActionType.getAllProductsOfCart, payload: [] };
        store.dispatch(action);
      }, err => alert(err.message));
  }
  //--- open / close shopping cart
  public collapse(): void {
    const productsDiv = document.getElementById("productsDiv");
    if (this.shoppingCartOpen) { this.shoppingCartOpen = false; productsDiv.style.width = "80%" }
    else { this.shoppingCartOpen = true; productsDiv.style.width = "70%" }
  }

  public removeProductFromCart(_id: string): void {
    //remove from db and redux.
    this.myShoppingService.removeFromCart(_id)
      .subscribe(res => {
        const action = { type: ActionType.removeFromCart, payload: _id };
        store.dispatch(action);
      }, err => alert(err.message));
    //update total price
    setTimeout(() => {
      this.getTotalPrice();
    }, 1000);
  }

}
