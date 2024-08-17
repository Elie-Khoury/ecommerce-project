import { Component, computed, effect, Input, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/Product.model';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products-swiper',
  templateUrl: './products-swiper.component.html',
  styleUrl: './products-swiper.component.scss'
})
export class ProductsSwiperComponent implements OnInit {

  @Input() toDisplay: string | number = "";
  @Input() excluded: IProduct | null = null;
  @Input() price: number = 1000;

  api!: ProductsService;
  products: IProduct[] = [];
  sortBy: string = '';
  spinnerName: string = 'sliderSpinner';

  productSubscription!: Subscription;

  isLoading!: Signal<boolean>;

  constructor(
    private spinner: NgxSpinnerService,
    private productsService: ProductsService
  ) {
    effect(() => {
      if (this.isLoading()) {
        this.spinner.show('swiperSpinner');
      }
      else {
        this.spinner.hide('swiperSpinner');
      }
    })
  }

  ngOnInit(): void {

    this.isLoading = computed(() => {
      return this.productsService.isLoadingSwiperProducts();
    })

    if (typeof this.toDisplay === "number") {
      this.productSubscription = this.productsService.getLimitedProducts(this.toDisplay).subscribe(products => {
        this.products = products;
      });
    }
    else {

      this.productSubscription = this.productsService.getCategoryProducts(this.toDisplay).subscribe((products => {
        this.products = products.filter(product => product.id !== this.excluded?.id);
      }));

    }
  }
}
