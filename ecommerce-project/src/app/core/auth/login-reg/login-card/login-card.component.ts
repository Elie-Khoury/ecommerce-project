import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'
import { LoginUserService } from '../services/login-user.service'
import { ILoginRequest } from '../models/LoginRequest';
import { ILoginResponse } from '../models/LoginResponse';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private loginService: LoginUserService, public loginReg: LoginRegComponent,
    private route: Router
  ) { }

  loginUser(data: ILoginRequest) {
    this.loginService.loginUser(data).subscribe((res: ILoginResponse) => {
      console.log('res', res);
      localStorage.setItem('token', res.Login.AccessToken);

      this.route.navigateByUrl('/home');
    })
  }

}
