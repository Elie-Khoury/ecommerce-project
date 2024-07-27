import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'
import { ILoginRequest } from '../../models/LoginRequest';
import { ILoginResponse } from '../../models/LoginResponse';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import * as fromAuthActions from '../../state/actions/auth.actions';
import { Store } from '@ngrx/store';

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
    public loginReg: LoginRegComponent,
    private store: Store,
  ) { }

  login(req: ILoginRequest) {
    this.store.dispatch(fromAuthActions.login({ req }));
  }
}
