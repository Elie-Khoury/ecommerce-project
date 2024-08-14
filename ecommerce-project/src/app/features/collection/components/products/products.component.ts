import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/models/product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  @Input() sortBy!: string;
  @Input() price!: number;

  productsSubscription!: Subscription;

  products: IProduct[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
