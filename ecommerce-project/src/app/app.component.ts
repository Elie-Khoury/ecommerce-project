import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthenticationService } from './core/auth/services/authentication.service';
import { Store } from '@ngrx/store';
import * as fromAuthActions from './core/auth/state/actions/auth.actions';
import { IProduct } from './features/products/models/Product.model';
import { ProductsService } from './features/products/services/products.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce-project';

  products = signal<IProduct[]>([]);

  ProductSubscribtion!: Subscription;

  showFooter: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromAuthActions.autologin());

    // this.ProductSubscribtion = this.prodService.getProducts().subscribe(products => {
    //   this.products.set(products);
    // });

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showFooter = currentRoute !== '/login'; // Modify the path as needed
    });
  }

  ngOnDestroy(): void {
    // this.ProductSubscribtion.unsubscribe();
  }
}
