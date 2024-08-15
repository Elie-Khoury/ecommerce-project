import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../envs/env.dev';
import { IProduct } from '../models/Product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  PRODUCTS_API: string = env.STORE_API + "products";
  CATEGORY_API: string = this.PRODUCTS_API + "/category/";

  public products$ = this.http.get<IProduct[]>(this.PRODUCTS_API);
  public limitedProducts$ = (limit: number) => this.http.get<IProduct[]>(this.PRODUCTS_API + "?limit=" + limit);
  public categoryProducts$ = (category: string) => {
    return this.http.get<IProduct[]>(this.CATEGORY_API + category);
  }

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.PRODUCTS_API);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.PRODUCTS_API + "/categories");
  }

}
