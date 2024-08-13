import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../shared/models/product';

@Pipe({
  name: 'sortProducts'
})
export class SortProductsPipe implements PipeTransform {

  transform(products: IProduct[], sortBy: string, price: number): IProduct[] {
    let sortedProducts = [...products];

    if (sortBy === 'priceAsc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (price) {
      sortedProducts = sortedProducts.filter(product => product.price <= price);
    }

    return sortedProducts;
  }

}
