import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IProduct } from '../../models/Product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { FormControl } from '@angular/forms';

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

  searchTerm = '';

  formValues = {
    sortBy: '',
    price: 0,
    category: []
  }

  toDisplay: string | number = "jewelery";
  filteredProducts: IProduct[] = [];

  constructor(private productsService: ProductsService) { }

  onFormValueChanged(values: any) {
    this.formValues = values;
    console.log(this.formValues);
  }

  onValueChange(value: any): void {
    if (value && value.trim() !== '') {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }


  ngOnInit(): void {

    this.categorySubscription = this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.productSubscription = this.productsService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });

  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

}
