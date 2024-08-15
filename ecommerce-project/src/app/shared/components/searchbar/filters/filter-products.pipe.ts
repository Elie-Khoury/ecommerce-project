import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../../../features/products/models/Product.model';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: IProduct[], searchTerm: string): IProduct[] | null {
    if (!products || !searchTerm) {
      return null;
    }
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
