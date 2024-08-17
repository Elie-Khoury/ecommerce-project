import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent implements OnInit {

  accountDetailsForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', Validators.required],
    phone: [''],
    address: [''],
    street: [''],
    building: ['']
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) { }

  onSubmit(): void {
    this.profileService.updateDetails(this.accountDetailsForm.value);
    this.router.navigateByUrl('/profile');
  }

  ngOnInit(): void {
    this.accountDetailsForm.patchValue(this.profileService.getAccountDetails());
  }
}
