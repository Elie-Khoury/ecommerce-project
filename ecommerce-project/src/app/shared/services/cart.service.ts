import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../models/product';
import { ICartItem } from '../models/cart';
import { CartMenuComponent } from '../../features/dashboard/components/cart-menu/cart-menu.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = signal<ICartItem[]>([]);

  public isActive = signal<boolean>(false);

  totalPrice = computed(() => {
    console.log(this.cart());
    return this.cart().reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0);
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

  increaseQuantity(product: IProduct) {
    this.cart.update(currentCart => {
      const itemIndex = currentCart.findIndex(cartItem => cartItem.product.id === product.id);

      if (itemIndex !== -1) {
        const updatedCart = [...currentCart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity + 1
        };

        return updatedCart;
      }

      return currentCart;
    });
  }

  reduceQuantity(product: IProduct) {
    this.cart.update(currentCart => {
      const itemIndex = currentCart.findIndex(cartItem => cartItem.product.id === product.id);

      if (itemIndex !== -1 && currentCart[itemIndex].quantity > 1) {
        const updatedCart = [...currentCart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: updatedCart[itemIndex].quantity - 1
        };

        return updatedCart;
      }

      return currentCart;
    });
  }

  toggleActive() {
    this.isActive.update(state => !state);
  }
}
