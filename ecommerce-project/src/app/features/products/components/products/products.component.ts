import { Component, computed, effect, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { IProduct } from '../../models/Product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  @Input() sortBy!: string;
  @Input() price!: number;
  @Input() products!: IProduct[];

  productsSubscription!: Subscription;

  isLoading!: Signal<boolean>;

  constructor(
    private spinner: NgxSpinnerService,
    private productsService: ProductsService
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
      return this.productsService.isLoadingProducts();
    })

  }

  ngOnDestroy(): void {
  }
}
