import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/Product.model';
import { CartService } from '../../../../core/app-shell/cart-menu/services/cart.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../core/auth/state/selectors/auth.selectors';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {

  @Input() product!: IProduct;

  constructor(
    private store: Store,
    private router: Router,
    private cartService: CartService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  addToCart(product: IProduct) {
    this.store.select(selectUser).pipe(
      take(1),
      tap(user => {
        if (user) {
          console.log("here")
          this.cartService.addToCart(product);
          this.snackbarService.showSnackBar('Added to cart');
        }
        else {
          this.snackbarService.showSnackBar('Please login first');
          this.router.navigateByUrl('/login');
        }
      })
    ).subscribe();
  }
}
