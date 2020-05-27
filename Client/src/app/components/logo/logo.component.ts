import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  public products: number = 0;
  public orders:number = 0;

  constructor(private myProductsService: ProductsService, private myOrderServices: OrderService) { }

  ngOnInit(): void {
    this.myProductsService.getAllProducts()
      .subscribe(res => this.products = res.length, err => alert(err.message));
      this.myOrderServices.getAllOrder()
      .subscribe(res => this.orders = res.length, err => alert(err.message));
  }

}
