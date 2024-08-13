import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/models/product';
import { SearchbarService } from '../../../../shared/components/searchbar/services/searchbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  @Input() sortBy!: string;
  @Input() price!: number;

  productsSubscription!: Subscription;

  products!: IProduct[];

  constructor(private searchService: SearchbarService) { }

  ngOnInit(): void {
    this.productsSubscription = this.searchService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
