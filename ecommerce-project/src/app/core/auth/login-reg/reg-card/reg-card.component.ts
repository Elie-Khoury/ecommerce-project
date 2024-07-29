import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'
import { ISignUpRequest } from '../../models/SignUpRequest';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomValidators } from '../validators/custom-validators.validator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuthActions from '../../state/actions/auth.actions';

@Component({
  selector: 'app-reg-card',
  templateUrl: './reg-card.component.html',
  styleUrl: './reg-card.component.scss'
})
export class RegCardComponent {

  regForm = this.fb.group({
    Firstname: ['', [Validators.required, CustomValidators.NameValidator]],
    Lastname: ['', [Validators.required, CustomValidators.NameValidator]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
    Rolename: ['', [Validators.required, CustomValidators.RoleValidator]]
  })

  constructor(
    private fb: FormBuilder,
    public loginReg: LoginRegComponent,
    private store: Store
  ) { }

  register(req: ISignUpRequest) {
    this.store.dispatch(fromAuthActions.signUp({ req }));
  }
}
