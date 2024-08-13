import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product';
import { Subscription } from 'rxjs';
import { CartService } from '../../../core/app-shell/cart-menu/services/cart.service';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-products-swiper',
  templateUrl: './products-swiper.component.html',
  standalone: true,
  styleUrls: ['./products-swiper.component.scss'],
  imports: [CommonModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsSwiperComponent implements OnInit {

  @Input() toDisplay: string | number = "";
  @Input() price: number = 1000;

  api!: ProductsService;
  products: IProduct[] = [];
  sortBy: string = '';

  productSubscription!: Subscription;

  constructor(
    private prodService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    if (typeof this.toDisplay === "number") {
      this.productSubscription = this.prodService.limitedProducts$(this.toDisplay).subscribe(products => {
        this.products = products;
      });
    }
    else {

      this.productSubscription = this.prodService.categoryProducts$(this.toDisplay).subscribe((products => {
        this.products = products;
      }));

    }
  }
}
