import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { store } from 'src/app/redux/store';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public user: UserModel;
  public products: ProductModel[];
  public product: ProductModel = new ProductModel();
  public categories: any = [];
  public newProduct: boolean = false;
  public editProduct: boolean = false;

  constructor(private myProductsService: ProductsService, private adminService: AdminService) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
    });
    this.myProductsService.getAllProducts()
      .subscribe(res => this.products = res, err => alert(err.message));
    this.adminService.getAllCategories()
      .subscribe(res => this.categories = res, err => alert(err.message));
  }

  public addProduct(): void {
    if (!this.product.img) {
      alert('You have to upload image !');
      return;
    }
    const myForm: FormData = new FormData();
    myForm.append('image', this.product.img);
    myForm.append('product', JSON.stringify(this.product));

    this.adminService.addProduct(myForm)
      .subscribe(res => {
        this.products.push(res);
        alert('product has been added !');
        this.goBack();
      }, err => console.log(err))

  }
  public updateImg(event: any): void {
    this.product.img = event.target.files[0];
  }

  public goToEditProduct(_id: string): void {
    this.editProduct = true;
    const selectedProduct = this.products.find(p => p._id === _id);
    this.product = selectedProduct;
  }

  public goToAddProduct(): void {
    this.newProduct = true;
  }

  public updateProduct(): void {
    const myForm: FormData = new FormData();
    myForm.append('image', this.product.img);
    myForm.append('product', JSON.stringify(this.product));

    this.adminService.updateProduct(myForm)
      .subscribe(res => {
        const index = this.products.findIndex(p => p._id === res._id);
        this.products[index] = res;
        alert('product has been updated !');
        this.goBack();
      }, err => alert(err.message))
  }

  public goBack(): void {
    this.newProduct = false;
    this.editProduct = false;
    this.product = new ProductModel();
  }
}
