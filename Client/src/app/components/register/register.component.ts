import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new UserModel();
  public verificationPassword: string;
  public spinner = false;
  public cities = ["Tel-Aviv", "Haifa", "Ashdod", "Beer-Sheva", "Afula", "Bat-Yam", "Eilat", "Hadera", "Herzliya", "Jerusalem"];

  constructor(private myRegisterService: RegisterService, private myRouter: Router) { }

  ngOnInit(): void {
    // if user already connected ,block this page for him.
    setTimeout(() => {
      if (store.getState().user !== null && store.getState().user.id !== undefined) { this.myRouter.navigateByUrl("/"); return; }
    }, 100);
  }
  /// ---- functions ---- ///
  // check if password match.
  public checkPassword(registerFormOne: NgForm): void {
    if (this.user.password !== this.verificationPassword) {
      registerFormOne.controls['verification'].setErrors({ 'passwordMatch': true });
    }
  }

  public checkForm(myForm: NgForm): void {
    const formObj = { id: this.user.id, email: this.user.email }
    this.myRegisterService.checkForm(formObj)
      .subscribe(result => {
        if (result.id[0]) {
          myForm.controls['id'].setErrors({ 'idTaken': true });
        }
        if (result.email[0]) {
          myForm.controls['email'].setErrors({ 'emailTaken': true });
        }
      }, err => alert(err.message));
    if (this.user.id.toString().length < 4) {
      myForm.controls['id'].setErrors({ 'minlength': true });
    }
    // if id or email has error i will give him timeout for update the form validation
    setTimeout(() => {
      if (myForm.valid) {
        this.spinner = true;
        document.getElementById('firstForm').style.display = 'none';
        setTimeout(() => {
          this.spinner = false;
          document.getElementById('secForm').style.display = 'block';
        }, 2000);
      }
    }, 1000);
  }

  public sendForm(myForm: NgForm): void {
    if (this.user.city === undefined) {
      myForm.controls['selectCity'].setErrors({ 'undefined': true });
      return;
    }
    this.myRegisterService.addUser(this.user)
      .subscribe(res => {
        localStorage.setItem('token', res.jwtToken);
        const action = { type: ActionType.userLogin, payload: res.user };
        store.dispatch(action);
        this.myRouter.navigateByUrl("/home");
        store.dispatch({ type: ActionType.updateUserActive, payload: true });
      }, err => alert(err.message));
  }
}
