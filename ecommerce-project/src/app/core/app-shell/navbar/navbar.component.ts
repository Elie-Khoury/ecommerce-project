import { Component, computed, Input, OnInit } from '@angular/core';
import { IImageUrls } from './models/ImgUrls.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/state/reducers/auth.reducer';
import * as fromAuthActions from '../../auth/state/actions/auth.actions';
import { CartService } from '../cart-menu/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(
    private store: Store<AuthState>,
    private cartService: CartService
  ) { }

  @Input() navDark!: boolean;

  imgUrls!: IImageUrls;

  cart = computed(() => {
    return this.cartService.cart();
  })

  onLogout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  toggleActive() {
    this.cartService.toggleActive();
  }

  ngOnInit(): void {
    this.imgUrls = {
      logoUrl: this.navDark ? 'assets/logo-dark.svg' : 'assets/logo-light.svg',
      dotUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=79003&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=79003&format=png&color=fafafa',
      searchUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=7695&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=7695&format=png&color=fafafa',
      cartUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=22167&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=22167&format=png&color=fafafa',
      profileUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=15265&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=15265&format=png&color=fafafa',
    }
  }
}
