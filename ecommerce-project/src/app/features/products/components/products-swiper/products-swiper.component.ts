import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/Product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-swiper',
  templateUrl: './products-swiper.component.html',
  styleUrl: './products-swiper.component.scss'
})
export class ProductsSwiperComponent implements OnInit {

  @Input() toDisplay: string | number = "";
  @Input() related: boolean = false;
  @Input() price: number = 1000;

  api!: ProductsService;
  products: IProduct[] = [];
  sortBy: string = '';

  productSubscription!: Subscription;

  constructor(
    private prodService: ProductsService,
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
