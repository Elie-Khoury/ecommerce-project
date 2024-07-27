import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IImageUrls } from './models/imgUrls';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User } from '../../auth/models/user';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../auth/state/selectors/auth.selectors';
import { AuthState } from '../../auth/state/reducers/auth.reducer';
import * as fromAuthActions from '../../auth/state/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(
    private store: Store<AuthState>,
    private authService: AuthenticationService
  ) { }

  @Input() navDark!: boolean;

  imgUrls!: IImageUrls;
  user$!: Observable<User | null>;

  onLogout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  ngOnInit(): void {

    this.user$ = this.store.select(selectUser);

    this.imgUrls = {
      logoUrl: this.navDark ? 'assets/logo-dark.svg' : 'assets/logo-light.svg',
      dotUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=79003&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=79003&format=png&color=fafafa',
      searchUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=7695&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=7695&format=png&color=fafafa',
      cartUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=22167&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=22167&format=png&color=fafafa',
      profileUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=15265&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=15265&format=png&color=fafafa',
    }
  }
}
