import { Component, OnInit } from '@angular/core';
import { IUserDetails } from '../../models/UserDetails.model';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrl: './profile-dashboard.component.scss'
})
export class ProfileDashboardComponent implements OnInit {

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
