import { Injectable, signal } from '@angular/core';
import { IProduct } from '../../../../features/products/models/Product.model';
import { env } from '../../../../../envs/env.dev';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  baseUrl: string = env.STORE_API;

  overlayOpen = signal(false);
  recentSearches = signal<IProduct[]>(localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user")!).recentSearches || []) : []);

  constructor(private router: Router) { }

  onSearch(search: IProduct) {
    this.overlayOpen.set(false);
    this.router.navigateByUrl("/collection/product/" + search.id);
  }

  addToRecentSearches(search: IProduct) {
    this.recentSearches.update(searches => [search, ...searches.filter(s => s !== search)]);
    this.setInLocalStorage();
  }

  removeFromRecentSearches(search: IProduct) {
    this.recentSearches.update(searches => searches.filter(s => s !== search));
    this.setInLocalStorage();
  }

  setInLocalStorage() {
    let user = JSON.parse(localStorage.getItem("user")!);

    user = {
      ...user,
      recentSearches: this.recentSearches()
    }

    localStorage.setItem("user", JSON.stringify(user));
  }
}
