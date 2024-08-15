import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/Product.model';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../core/app-shell/cart-menu/services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

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
