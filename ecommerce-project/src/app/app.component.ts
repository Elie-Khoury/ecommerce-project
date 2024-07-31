import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthenticationService } from './core/auth/services/authentication.service';
import { Store } from '@ngrx/store';
import * as fromAuthActions from './core/auth/state/actions/auth.actions';
import { IProduct } from './shared/models/product';
import { ProductsService } from './shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce-project';

  products = signal<IProduct[]>([]);

  ProductSubscribtion!: Subscription;

  constructor(private store: Store, private prodService: ProductsService) { }

  ngOnInit(): void {
    this.store.dispatch(fromAuthActions.autologin());

    // this.ProductSubscribtion = this.prodService.getProducts().subscribe(products => {
    //   this.products.set(products);
    // });
  }

  ngOnDestroy(): void {
    // this.ProductSubscribtion.unsubscribe();
  }
}
