import { Component, OnInit } from '@angular/core';
import { IUserDetails } from './models/UserDetails.model';
import { ProfileService } from './services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userDetails!: IUserDetails;

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  editDetails() {
    this.router.navigateByUrl('profile/account-details');
  }

  ngOnInit(): void {
    this.userDetails = this.profileService.getUserDetails();
  }
}
