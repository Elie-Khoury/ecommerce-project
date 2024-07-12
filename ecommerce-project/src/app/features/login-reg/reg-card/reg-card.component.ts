import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { RegUserService } from '../services/reg-user.service';
import { LoginRegComponent } from '../login-reg.component'

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
    firstName: ['', [NameValidator]],
    lastName: ['', [NameValidator]],
    email: [''],
    password: [''],
    confirmPassword: ['']
  })

  constructor(private fb: FormBuilder, private regService: RegUserService, public loginReg: LoginRegComponent) { }

  registerUser(data: any) {
    this.regService.registerUser(data);
  }
}
