import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuthActions from './core/auth/state/actions/auth.actions';
import { IProduct } from './features/products/models/Product.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-project';

  products = signal<IProduct[]>([]);

  ProductSubscribtion!: Subscription;

  showNavbar: boolean = true;
  showChatBot: boolean = true;
  showFooter: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromAuthActions.autologin());

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      const excludedRoutes = ['/login', '/profile/account-details', '/profile/payment-details', '/admin'];

      if (excludedRoutes.includes(currentRoute)) {
        this.showFooter = false;
        this.showChatBot = false;
        this.showNavbar = false;
      }
      else {
        this.showFooter = true;
        this.showChatBot = true;
        this.showNavbar = true;
      }

      if (currentRoute == '/home') {
        this.showNavbar = false;
      }
    });
  }

}
