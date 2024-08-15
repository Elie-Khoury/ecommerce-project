import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../../../../features/products/models/Product.model';
import { ICartItem } from '../models/Cart.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../auth/state/selectors/auth.selectors';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = signal<ICartItem[]>(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).cart : []);

  public isActive = signal<boolean>(false);

  totalPrice = computed(() => {
    return this.cart().reduce((acc, curr) => acc + (curr.quantity * curr.product.price), 0);
  })

  constructor(
    private router: Router,
    private store: Store
  ) { }

  addToCart(product: IProduct) {
    let Subscription = this.store.select(selectUser).pipe(
      take(1),
      tap(user => {
        if (user) {

          let user = JSON.parse(localStorage.getItem("user")!);

          for (let item of this.cart()) {
            if (item.product.id === product.id) {
              item.quantity++;
              user = {
                ...user,
                cart: this.cart()
              }

              localStorage.setItem("user", JSON.stringify(user));

              return
            }
          }
          this.cart.update((cart) => [...cart, { product, quantity: 1 }]);



          user = {
            ...user,
            cart: this.cart()
          }

          localStorage.setItem("user", JSON.stringify(user));
        }
        else {
          this.router.navigateByUrl("/login");
        }
      })

    ).subscribe();

    Subscription.unsubscribe();
  }

  removeFromCart(product: IProduct) {
    this.cart.update((cart) => cart.filter(i => i.product !== product));

    let user = JSON.parse(localStorage.getItem("user")!);

    user = {
      ...user,
      cart: this.cart()
    }

    localStorage.setItem("user", JSON.stringify(user));

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

    let user = JSON.parse(localStorage.getItem("user")!);

    user = {
      ...user,
      cart: this.cart()
    }

    localStorage.setItem("user", JSON.stringify(user));
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

    let user = JSON.parse(localStorage.getItem("user")!);

    user = {
      ...user,
      cart: this.cart()
    }

    localStorage.setItem("user", JSON.stringify(user));
  }

  toggleActive() {
    this.isActive.update(state => !state);
  }

  confirmOrder() {
    window.alert("Your order has been confirmed!");

    this.cart.set([]);

    let user = JSON.parse(localStorage.getItem("user")!);

    user = {
      ...user,
      cart: this.cart()
    }

    localStorage.setItem("user", JSON.stringify(user));
  }
}
