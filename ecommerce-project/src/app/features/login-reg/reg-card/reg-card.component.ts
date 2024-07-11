import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RegUserService } from '../services/reg-user.service';

@Component({
  selector: 'app-reg-card',
  templateUrl: './reg-card.component.html',
  styleUrl: './reg-card.component.scss'
})
export class RegCardComponent {

  regForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    password: [''],
    confirmPassword: ['']
  })

  constructor(private fb: FormBuilder, private regService: RegUserService) { }

  registerUser(data: any) {
    this.regService.registerUser(data);
  }
}
