import { effect, Injectable, signal } from '@angular/core';
import { IProduct } from '../../../models/product';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../../../envs/env.dev';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchbarService {

  baseUrl: string = env.STORE_API;

  overlayOpen = signal(false);
  recentSearches = signal<string[]>(JSON.parse(localStorage.getItem("recentSearches") ?? '[]'));

  constructor(private http: HttpClient, private router: Router) { }

  onSearch(searchTerm: string) {
    this.overlayOpen.set(false);
    // this.router.navigateByUrl("/profile");
    this.addToRecentSearches(searchTerm);
  }

  addToRecentSearches(search: string) {
    const lowerCaseTerm = search.toLowerCase();
    this.recentSearches.update(searches => [lowerCaseTerm, ...searches.filter(s => s !== lowerCaseTerm)]);
  }

  removeFromRecentSearches(search: string) {
    this.recentSearches.update(searches => searches.filter(s => s !== search));
  }

  saveLocalStorage = effect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(this.recentSearches()));
  })
}
