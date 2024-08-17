import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IProduct } from '../../models/Product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit, OnDestroy {

  categorySubscription!: Subscription;
  productSubscription!: Subscription;

  products!: IProduct[];
  categories!: string[];

  isActive = signal(false);

  formValues = {
    sortBy: '',
    price: 0,
    category: []
  }

  toDisplay: string | number = "jewelery";

  constructor(private productsService: ProductsService) { }

  onFormValueChanged(values: any) {
    this.formValues = values;
    console.log(this.formValues);
  }

  ngOnInit(): void {

    this.categorySubscription = this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.productSubscription = this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

}
