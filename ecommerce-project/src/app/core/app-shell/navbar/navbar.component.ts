import { Component, computed, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { IImageUrls } from './models/ImgUrls.model';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../auth/state/reducers/auth.reducer';
import * as fromAuthActions from '../../auth/state/actions/auth.actions';
import { CartService } from '../cart-menu/services/cart.service';
import { selectUser } from '../../auth/state/selectors/auth.selectors';
import { Observable, Subscription, take, tap } from 'rxjs';
import { User } from '../../auth/models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  routerSubscription!: Subscription;

  // Use CSS class names defined in SCSS
  badgeClass: string = 'custom-badge';

  // Method to change badge color
  changeBadgeColor(colorClass: string) {
    this.badgeClass = colorClass;
  }

  readonly panelOpenState = signal(false);

  isLogin: boolean = false;
  isHamActive: boolean = false;

  imgUrls!: IImageUrls;
  user$!: Observable<User | null>;

  cart = computed(() => {
    return this.cartService.cart();
  })

  constructor(
    private store: Store<AuthState>,
    private cartService: CartService,
    private router: Router
  ) { }

  onLogout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  toggleActive() {
    this.cartService.toggleActive();
  }

  toggleHamActive() {
    this.isHamActive = !this.isHamActive;
  }

  ngOnInit(): void {

    this.changeBadgeColor('custom-badge');

    this.routerSubscription = this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isLogin = currentRoute === '/login';
      this.imgUrls.logoUrl = !this.isLogin ? 'assets/logo-dark.svg' : 'assets/logo-light.svg';
    });

    this.imgUrls = {
      logoUrl: !this.isLogin ? 'assets/logo-dark.svg' : 'assets/logo-light.svg',
      dotUrl: 'https://img.icons8.com/?size=100&id=79003&format=png&color=212322',
      searchUrl: 'https://img.icons8.com/?size=100&id=7695&format=png&color=212322',
      cartUrl: 'https://img.icons8.com/?size=100&id=22167&format=png&color=212322',
      profileUrl: 'https://img.icons8.com/?size=100&id=15265&format=png&color=212322',
    }

    this.user$ = this.store.pipe(select(selectUser));

  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
