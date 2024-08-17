import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { env } from '../../../../envs/env.dev';
import { IProduct } from '../models/Product.model';
import { delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  PRODUCTS_API: string = env.STORE_API + "products";
  CATEGORY_API: string = this.PRODUCTS_API + "/category/";

  isLoadingProducts = signal<boolean>(false);
  isLoadingProduct = signal<boolean>(false);
  isLoadingSwiperProducts = signal<boolean>(false);


  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    console.log("getting products");
    this.isLoadingProducts.set(true);
    return this.http.get<IProduct[]>(this.PRODUCTS_API).pipe(
      tap(() => this.isLoadingProducts.set(false))
    );
  }

  getProduct(id: number): Observable<IProduct> {
    console.log("getting product");
    this.isLoadingProduct.set(true);
    return this.http.get<IProduct>(this.PRODUCTS_API + "/" + id).pipe(
      tap(() => this.isLoadingProduct.set(false))
    );
  }

  getCategories(): Observable<string[]> {
    console.log('getting categories');
    return this.http.get<string[]>(this.PRODUCTS_API + "/categories");
  }

  getLimitedProducts(limit: number): Observable<IProduct[]> {
    console.log('getting limited products');
    this.isLoadingSwiperProducts.set(true);
    return this.http.get<IProduct[]>(this.PRODUCTS_API + "?limit=" + limit).pipe(
      tap(() => {
        this.isLoadingSwiperProducts.set(false);
      })
    );
  }

  getCategoryProducts(category: string): Observable<IProduct[]> {
    console.log('getting category products');
    this.isLoadingSwiperProducts.set(true);
    return this.http.get<IProduct[]>(this.CATEGORY_API + category).pipe(
      tap(() => {
        this.isLoadingSwiperProducts.set(false);
      })
    );
  }

}
