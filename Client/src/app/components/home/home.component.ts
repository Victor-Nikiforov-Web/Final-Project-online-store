import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public user: UserModel;

  constructor(private myRouter: Router) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
    });
    setTimeout(() => {
      if(this.user && this.user.isAdmin){
        this.myRouter.navigateByUrl("/admin");
      }
    }, 2000);
  }

}
