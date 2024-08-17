import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss'
})
export class PaymentDetailsComponent implements OnInit {

  paymentDetailsForm: FormGroup = this.fb.group({
    fullName: [''],
    cardNum: [''],
    expiration: [''],
    CVC: [''],
    country: [''],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) { }

  onSubmit(): void {
    this.profileService.updateDetails(this.paymentDetailsForm.value);
    this.router.navigateByUrl('/profile');
  }

  ngOnInit(): void {
    this.paymentDetailsForm.patchValue(this.profileService.getPaymentDetails());
  }
}
