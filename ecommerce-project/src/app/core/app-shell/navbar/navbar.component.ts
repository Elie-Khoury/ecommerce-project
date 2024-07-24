import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IImageUrls } from './models/imgUrls';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User } from '../../auth/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthenticationService) { }

  @Input() navDark!: boolean;

  imgUrls!: IImageUrls;
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;

  onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {

    this.userSubscription = this.authService.$user.subscribe((user: (User | null)) => {
      this.isLoggedIn = user ? true : false;
    })

    this.imgUrls = {
      logoUrl: this.navDark ? 'assets/logo-dark.svg' : 'assets/logo-light.svg',
      dotUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=79003&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=79003&format=png&color=fafafa',
      searchUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=7695&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=7695&format=png&color=fafafa',
      cartUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=22167&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=22167&format=png&color=fafafa',
      profileUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=15265&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=15265&format=png&color=fafafa',
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
