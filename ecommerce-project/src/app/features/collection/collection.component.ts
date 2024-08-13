import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SearchbarService } from '../../shared/components/searchbar/services/searchbar.service';
import { IProduct } from '../../shared/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit, OnDestroy {

  categorySubscription!: Subscription;
  productSubscription!: Subscription;

  navDark!: boolean;
  formValues = {
    sortBy: '',
    price: 0,
    category: []
  }

  isActive = signal(false);

  products!: IProduct[];
  categories!: string[];
  toDisplay: string | number = "jewelery";

  constructor(private searchService: SearchbarService) { }

  onFormValueChanged(values: any) {
    this.formValues = values;
    console.log(this.formValues);
  }

  ngOnInit(): void {

    this.navDark = true;

    this.categorySubscription = this.searchService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.productSubscription = this.searchService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

}
