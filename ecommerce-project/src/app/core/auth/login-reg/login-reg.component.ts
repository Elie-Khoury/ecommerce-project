import { Component } from '@angular/core';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrl: './login-reg.component.scss'
})
export class LoginRegComponent {

  constructor() { }

  bgImg: string = 'assets/reg-bg.jpg';

  loginPage: boolean = true;

  toggleLogin() {
    this.loginPage = !this.loginPage;
  }
}
