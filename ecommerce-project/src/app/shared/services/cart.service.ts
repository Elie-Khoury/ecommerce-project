import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../models/product';
import { ICartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<ICartItem[]>([]);

  totalPrice = computed(() => {
    return this.cart().reduce((acc, curr) => acc + curr.product.price, 0);
  })

  constructor() { }

  addToCart(product: IProduct) {
    for (const item of this.cart()) {
      if (item.product === product) {
        item.quantity++;
        console.log(this.cart());
        return
      }
    }
    this.cart.update((cart) => [...cart, { product, quantity: 1 }]);
    console.log(this.cart());
  }
  removeFromCart(product: IProduct) {
    this.cart.update((cart) => cart.filter(i => i.product !== product));
  }
}
