import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product';
import { CartService } from '../../../core/app-shell/cart-menu/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: IProduct;

  constructor(private cartService: CartService) { }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert("Product added to cart");
  }
}
