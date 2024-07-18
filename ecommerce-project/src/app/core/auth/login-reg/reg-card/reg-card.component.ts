import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { LoginRegComponent } from '../login-reg.component'
import { ISignUpRequest } from '../models/SignUpRequest';
import { AuthenticationService } from '../../../services/authentication.service';

export const NameValidator = (control: AbstractControl,): ValidationErrors | null => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return numbers.includes(control.value) ? { invalidName: "You can't include numbers" } : null
}

@Component({
  selector: 'app-reg-card',
  templateUrl: './reg-card.component.html',
  styleUrl: './reg-card.component.scss'
})
export class RegCardComponent {

  regForm = this.fb.group({
    Firstname: ['', [NameValidator]],
    Lastname: ['', [NameValidator]],
    Email: [''],
    Password: [''],
    Rolename: ['']
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public loginReg: LoginRegComponent,
  ) { }

  registerUser(data: ISignUpRequest) {
    this.authService.registerUser(data).subscribe();
  }
}
