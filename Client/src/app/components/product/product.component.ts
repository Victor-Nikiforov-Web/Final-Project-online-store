import { Component, OnInit, Input } from '@angular/core';
import { CartDetail } from 'src/app/models/cart-detail';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserModel } from 'src/app/models/user';
import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public user: UserModel = store.getState().user;
  public shoppingCartProducts: CartDetail[] = [];
  public cartOption:boolean = store.getState().cartOption;

  @Input()
  public imageSrc: string;
  @Input()
  public productName: string;
  @Input()
  public productPrice: number;
  @Input()
  public productId: string;

  public product: CartDetail = new CartDetail();
  constructor(private myShoppingService: ShoppingCartService) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
      this.shoppingCartProducts = store.getState().productsOfCart;
      this.cartOption = store.getState().cartOption;
    });
    this.product.amount = 1;
  }

  public addToCart(): void {
    //check if product already in cart and update him .
    const findProduct: CartDetail = this.shoppingCartProducts.find(p => p.productId === this.productId)
    if (findProduct) {
      findProduct.amount += +this.product.amount;
      findProduct.price += +this.productPrice * this.product.amount;
      this.myShoppingService.updateProduct(findProduct)
        .subscribe(res => {
          const action = { type: ActionType.updateProduct, payload: res };
          store.dispatch(action);
        }, err => alert(err.message));
      //update total price
      setTimeout(() => {
        const totalPrice = this.myShoppingService.getTotalPrice(this.shoppingCartProducts);
        const action = { type: ActionType.updateTotalPrice, payload: totalPrice };
        store.dispatch(action);
      }, 1000);
      return;
    }
    //add product to cart.
    const cart = JSON.parse(localStorage.getItem("myCart"));
    if (this.product.amount <= 0) { alert('invalid number of amount !'); return; }
    this.product.productId = this.productId;
    this.product.name = this.productName;
    this.product.cartId = cart._id;
    this.product.price = this.productPrice * this.product.amount;
    //-------- add product to cart
    this.myShoppingService.addProductToCart(this.product)
      .subscribe(res => {
        const action = { type: ActionType.addProductToCart, payload: res };
        store.dispatch(action);
      }, err => alert(err.message));
    //update total price
    setTimeout(() => {
      const totalPrice = this.myShoppingService.getTotalPrice(this.shoppingCartProducts);
      const action = { type: ActionType.updateTotalPrice, payload: totalPrice };
      store.dispatch(action);
    }, 1000);
  }

}
