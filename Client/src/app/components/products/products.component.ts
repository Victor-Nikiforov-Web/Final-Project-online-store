import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public dairyProducts: ProductModel[] = [];
  public meatAndFish: ProductModel[] = [];
  public fruitsAndVegetables: ProductModel[] = [];
  public searchStatus = false;
  public searchStr: string;
  public searchProducts: ProductModel[] = [];

  constructor(private myProductsService: ProductsService) { }

  ngOnInit(): void {
    const dairyId = "5eb99c6201af09f44df2c2fe";
    const meatAndFishId = "5eb99c7701af09f44df2c30c";
    const fruitsAndVegetables = "5eb99c9301af09f44df2c31a";

    this.myProductsService.getAllProducts()
      .subscribe(res => {
        res.map(product => {
          if (product.categoryId === dairyId) { this.dairyProducts.push(product); }
          if (product.categoryId === meatAndFishId) { this.meatAndFish.push(product); }
          if (product.categoryId === fruitsAndVegetables) { this.fruitsAndVegetables.push(product); }
        });
      }, err => alert(err.message));
  }

  public searchProduct(): void {
    this.myProductsService.searchProduct(this.searchStr)
      .subscribe(res => {
        this.searchProducts = res;
        this.searchStatus = true;
      }, err => alert(err.message));
  }

  public backToAllProducts(): void {
    this.searchStr = '';
    this.searchStatus = false;
    this.searchProducts = [];
  }
}
