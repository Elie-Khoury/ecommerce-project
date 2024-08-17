import { Component, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { SearchbarService } from './services/searchbar.service';
import { IProduct } from '../../../features/products/models/Product.model';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../../../features/products/services/products.service';
import { Subscription, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../core/auth/state/selectors/auth.selectors';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit, OnDestroy {

  productsSubscription!: Subscription;

  searchTerm = new FormControl('');

  products!: IProduct[];
  filteredProducts: IProduct[] = [];

  overlayOpen = this.searchService.overlayOpen;

  recentSearches = this.searchService.recentSearches;

  constructor(
    private store: Store,
    private searchService: SearchbarService,
    private productsService: ProductsService
  ) { }

  onSearch(search: IProduct | null) {

    if (!search) { return; }
    this.searchTerm.setValue('');

    this.store.select(selectUser).pipe(
      take(1),
      tap(user => {
        if (user) {
          this.searchService.addToRecentSearches(search);
        }
      })
    ).subscribe();

    this.searchService.onSearch(search);
  }

  removeFromRecentSearches(search: IProduct) {
    this.searchService.removeFromRecentSearches(search);
  }

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.searchTerm.valueChanges.subscribe(value => {

      if (value !== '' && value !== null) {
        this.filteredProducts = this.products.filter(product =>
          product.title.toLowerCase().includes(value.toLowerCase())
        );
      }

    });

  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

}
