import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { store } from 'src/app/redux/store';
import { RegisterService } from 'src/app/services/register.service';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: UserModel;
  public loginForm = { email: '', password: '' };

  constructor(private myRegisterService: RegisterService,private myRouter: Router) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
    });
    //check auto login
    if (!this.user) {
      this.myRegisterService.autoLogin()
        .subscribe(res => {
          //check res if user have token
          if (res.name === 'JsonWebTokenError') {
            return;
          }
          //redux
          const action = { type: ActionType.userLogin, payload: res.user };
          store.dispatch(action);
        }, err => alert(err.message));
    }
  }
  public logout(): void {
    const action = { type: ActionType.userLogin, payload: null };
    store.dispatch(action);
    store.dispatch({ type: ActionType.updateUserActive, payload:false });
    localStorage.removeItem('token');
    this.myRouter.navigateByUrl("/");
  }

  public login(): void {
    this.myRegisterService.login(this.loginForm)
      .subscribe(res => {
        if (!res.user) {
          alert('Wrong email / password .');
          return;
        }
        const action = { type: ActionType.userLogin, payload: res.user };
        store.dispatch(action);
        localStorage.setItem('token', res.jwtToken);
        if(res.user.isAdmin === true){
          this.myRouter.navigateByUrl("/admin");
        }
      }, err => alert(err.message));
  }

}
