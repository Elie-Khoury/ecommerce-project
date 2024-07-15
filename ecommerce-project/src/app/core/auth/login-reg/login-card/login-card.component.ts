import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'
import { LoginUserService } from '../services/login-user.service'
import { ILoginRequest } from '../models/LoginRequest';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {

  loginForm = this.fb.group({
    username: [''],
    password: [''],
  })

  constructor(private fb: FormBuilder, private loginService: LoginUserService, public loginReg: LoginRegComponent) { }

  loginUser(data: ILoginRequest) {
    this.loginService.loginUser(data);
  }

}
