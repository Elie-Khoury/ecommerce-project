import { Component, computed, effect, OnDestroy, OnInit, Signal } from '@angular/core';
import { IProduct } from '../../models/Product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../core/app-shell/cart-menu/services/cart.service';
import { ProductsService } from '../../services/products.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { Subscription, switchMap, take, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../core/auth/state/selectors/auth.selectors';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productSubscription!: Subscription;

  isLoading!: Signal<boolean>;
  selectedProduct!: IProduct;
  productId!: number;

  constructor(
    private store: Store,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private cartService: CartService,
    private productsService: ProductsService,
    private snackbarService: SnackbarService
  ) {
    effect(() => {
      if (this.isLoading()) {
        this.spinner.show();
      }
      else {
        this.spinner.hide();
      }
    })
  }


  ngOnInit(): void {

    this.isLoading = computed(() => {
      return this.productsService.isLoadingProduct();
    })

    this.productSubscription = this.activeRoute.params
      .pipe(
        switchMap(params => {
          const productId = +params['id'];
          return this.productsService.getProduct(productId);
        })
      )
      .subscribe(product => {
        this.selectedProduct = product;
      });

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

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
