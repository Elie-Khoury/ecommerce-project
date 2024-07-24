import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'
import { ISignUpRequest } from '../../models/SignUpRequest';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomValidators } from '../validators/custom-validators.validator';
import { Router } from '@angular/router';

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
    private authService: AuthenticationService,
    private router: Router,
    public loginReg: LoginRegComponent,
  ) { }

  register(data: ISignUpRequest) {

    if (data.Rolename?.toLowerCase() == "user") {
      this.authService.registerUser(data).subscribe(
        {
          error: (err) => {
            if (err.status === 401) {
              window.alert("Something went wrong. Please try again.");
            }
            else if (err.status === 404) {
              window.alert("Page not found.");
            }
          }
        }
      )
    }
    else {
      this.authService.registerAdmin(data).subscribe(
        {
          error: (err) => {
            if (err.status === 401) {
              window.alert("Something went wrong. Please try again.");
            }
            else if (err.status === 404) {
              window.alert("Page not found.");
            }
          }
        }
      )
    }

    this.router.navigateByUrl('/login');
  }
}
