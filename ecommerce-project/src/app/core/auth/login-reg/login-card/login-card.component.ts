import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public loginReg: LoginRegComponent,
    private router: Router
  ) { }

  loginUser(data: ILoginRequest) {
    this.authService.loginUser(data).subscribe(
      {
        next: (res: ILoginResponse) => {
          localStorage.setItem('token', res.Login.AccessToken);
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          if (err.status === 401) {
            console.log("Something went wrong. Please try again.");
            this.router.navigateByUrl('/login');
          }
          else if (err.status === 404) {
            console.log("Page not found.");
            this.router.navigateByUrl('/home');
          }
        }
      })
  }

}
