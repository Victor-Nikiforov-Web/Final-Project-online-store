import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "payment", component: PaymentPageComponent },
  { path: "admin", component: AdminComponent},
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
