import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { CartService } from '../../../core/app-shell/cart-menu/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {

  @Input() product!: IProduct;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log(this.product);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert("Product added to cart");
  }
}
