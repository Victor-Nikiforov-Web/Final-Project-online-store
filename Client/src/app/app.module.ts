import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoComponent } from './components/logo/logo.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {DemoMaterialModule} from './models/material-module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    LogoComponent,
    RegisterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ShoppingCartComponent,
    PaymentPageComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
