import { Component, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { SearchbarService } from './services/searchbar.service';
import { IProduct } from '../../models/product';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit, OnDestroy {


  searchTerm = new FormControl('');

  products!: IProduct[];
  filteredProducts!: IProduct[];

  overlayOpen = this.searchService.overlayOpen;

  recentSearches = this.searchService.recentSearches;

  constructor(private searchService: SearchbarService) { }

  onSearch(search: string | null) {

    if (!search) { return; }
    this.searchTerm.setValue('');
    this.searchService.onSearch(search);
  }

  removeFromRecentSearches(search: string) {
    this.searchService.removeFromRecentSearches(search);
  }

  ngOnInit(): void {
    this.searchService.getProducts().subscribe((products) => {
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

  }

}