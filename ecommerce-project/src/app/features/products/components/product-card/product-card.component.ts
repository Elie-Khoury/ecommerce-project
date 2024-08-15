import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/Product.model';
import { CartService } from '../../../../core/app-shell/cart-menu/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {

  @Input() product!: IProduct;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
