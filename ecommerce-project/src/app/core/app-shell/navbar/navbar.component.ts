import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IImageUrls } from './models/ImgUrls.model';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User } from '../../auth/models/User.model';
import { Observable, Subscription, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../auth/state/selectors/auth.selectors';
import { AuthState } from '../../auth/state/reducers/auth.reducer';
import * as fromAuthActions from '../../auth/state/actions/auth.actions';
import { CartMenuComponent } from '../cart-menu/cart-menu.component';
import { CartService } from '../cart-menu/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(
    private store: Store<AuthState>,
    private authService: AuthenticationService,
    private router: Router,
    private cartService: CartService
  ) { }

  @Input() navDark!: boolean;

  imgUrls!: IImageUrls;
  user$!: Observable<User | null>;

  onLogout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  toggleActive() {

    // let Subscription: Subscription = this.store.select(selectUser).pipe(
    //   take(1),
    //   tap(user => {
    //     if (user) {
    //       this.cartService.toggleActive();

    //     } else {
    //       this.router.navigate(['/login']);
    //     }
    //   })
    // ).subscribe();

    // Subscription.unsubscribe();

    this.cartService.toggleActive();

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
