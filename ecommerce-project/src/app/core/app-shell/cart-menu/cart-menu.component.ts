import { Component, computed, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { IProduct } from '../../../shared/models/product';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrl: './cart-menu.component.scss'
})
export class CartMenuComponent implements OnInit {

  binIcon: string = 'https://img.icons8.com/?size=100&id=47258&format=png&color=c3c3c3';
  binIconHovered: string = 'https://img.icons8.com/?size=100&id=47258&format=png&color=000000';

  removeIcon!: string;

  isActive = computed(() => {
    return this.cartService.isActive();
  })

  cart = computed(() => {
    return this.cartService.cart();
  })

  totalPrice = computed(() => {
    return this.cartService.totalPrice();
  })

  constructor(
    private cartService: CartService
  ) { }

  toggleActive() {
    this.cartService.toggleActive();
  }

  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
  }

  reduceQuantity(product: IProduct) {
    this.cartService.reduceQuantity(product);
  }

  increaseQuantity(product: IProduct) {
    this.cartService.increaseQuantity(product);
  }

  onHover() {
    this.removeIcon = this.binIconHovered;
  }

  onLeave() {
    this.removeIcon = this.binIcon;
  }

  ngOnInit(): void {
    this.removeIcon = this.binIcon;
  }
}
