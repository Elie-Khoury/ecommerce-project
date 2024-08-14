import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/app-shell/cart-menu/services/cart.service';
import { IProduct } from '../../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  navDark: boolean = true;

  selectedProduct!: IProduct;
  productId!: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.productId = +this.activeRoute.snapshot.paramMap.get('id')!;

    this.productsService.getProducts().subscribe((products) => {
      this.selectedProduct = products.find(product => product.id === this.productId)!;
    })
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
}
