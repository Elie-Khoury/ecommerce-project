import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'
import { ILoginRequest } from '../models/LoginRequest';
import { ILoginResponse } from '../models/LoginResponse';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public loginReg: LoginRegComponent,
    private route: Router
  ) { }

  loginUser(data: ILoginRequest) {
    this.authService.loginUser(data).subscribe((res: ILoginResponse) => {
      localStorage.setItem('token', res.Login.AccessToken);
      this.route.navigateByUrl('/home');
    })
  }

}
