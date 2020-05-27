import { Component, OnInit } from '@angular/core';
import { CartDetail } from 'src/app/models/cart-detail';
import { UserModel } from 'src/app/models/user';
import { store } from 'src/app/redux/store';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { OrderModel } from 'src/app/models/order';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { OrderService } from 'src/app/services/order.service';
import { ActionType } from 'src/app/redux/action-type';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit {
  public products: CartDetail[];
  public user: UserModel = store.getState().user;
  public totalPrice: number;
  public order: OrderModel = new OrderModel();
  public cities = ["Tel-Aviv", "Haifa", "Ashdod", "Beer-Sheva", "Afula",
    "Bat-Yam", "Eilat", "Hadera", "Herzliya", "Jerusalem"];
  public searchStr: string;
  public datesArr: any[] = [];
  public paymentComplete: boolean = false;
  public filePath: string = '';
  public path: string = 'http://localhost:3000/api/order/get-receipt';

  constructor(private myShoppingService: ShoppingCartService, private myOrderServices: OrderService,
    private myRouter: Router) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
    });
    //get all products and total price..
    const localCart = localStorage.getItem("myCart");
    const cartId = JSON.parse(localCart)._id;
    this.myShoppingService.getAllProducts({ cartId: cartId })
      .subscribe(res => {
        this.products = res;
        this.order.totalPrice = this.myShoppingService.getTotalPrice(res);
      }, err => alert(err.message));

    this.order.cartId = cartId;
    //get all orders for date picker
    this.getAllOrders();
    setTimeout(() => {
      this.order.city = this.user.city;
      this.order.street = this.user.street;
    }, 1000);
  }

  public searchProduct(): void {
    //reset all marked products 
    this.products.map(p => document.getElementById(p.name).removeAttribute("class"));
    if (this.searchStr.length === 0) { return; }
    //create tmp arr for marked products
    let tmpArr = [];
    this.products.map(p => {
      if (p.name.includes(this.searchStr)) {
        tmpArr.push(p);
        document.getElementById(p.name).setAttribute("class", "marked");
      }
    });
  }

  public routeToHome(): void { this.myRouter.navigateByUrl("/"); }

  public sendOrder(): void {
    if (this.order.shippingDate === undefined) { alert('Enter date !'); return; }
    this.myOrderServices.addOrder(this.order)
      .subscribe(res => { this.filePath = res.file; this.paymentComplete = true; }, err => alert(err.message));
      localStorage.removeItem("myCart");
      const action = { type: ActionType.getAllProductsOfCart, payload: [] };
        store.dispatch(action);
  }

  public dateValidator(myForm: NgForm, date: Date): void {
    const todayDate = new Date().getTime();
    const inputDate = date.getTime();
    // if selected date is smaller than today's date
    if (todayDate > inputDate) {
      if (date.toDateString() === new Date().toDateString()) {
        //if this today day don't throw error
        myForm.controls['datepicker'].setErrors({ 'invalid_Date': null });
        return;
      }
      myForm.controls['datepicker'].setErrors({ 'invalid_Date': true });
      myForm.form.setErrors({invalid: true})
      return;
    } else { myForm.controls['datepicker'].setErrors({ 'invalid_Date': null }); }
  }
  public getAllOrders(): void {
    const tmpArrCount = [];
    //get all orders dates 
    this.myOrderServices.getAllOrder()
      .subscribe(res => {
        res.map(order => {
          //arrange them by count 
          const date = new Date(order.shippingDate).toLocaleDateString();
          const obj = tmpArrCount.find(e => e.date === date);
          if (obj) { obj.count++; return; }
          tmpArrCount.push({ date: date, count: 1 })
        });
      }, err => alert(err.message));
    setTimeout(() => {
      tmpArrCount.map(obj => obj.count >= 3 ? this.datesArr.push(obj.date) : null);
    }, 1000);
  }
  public dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const newDate = date.toLocaleDateString();
      return this.datesArr.map(date => (newDate === date) ? 'busy-day' : '')
    };
  }

}
