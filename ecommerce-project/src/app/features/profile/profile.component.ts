import { Component, OnInit } from '@angular/core';
import { IUserDetails } from './models/UserDetails.model';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userDetails!: IUserDetails;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.userDetails = this.profileService.getUserDetails();
  }


}
