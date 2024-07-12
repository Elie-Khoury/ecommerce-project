import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  })

  constructor(private fb: FormBuilder, public loginReg: LoginRegComponent) { }

}
