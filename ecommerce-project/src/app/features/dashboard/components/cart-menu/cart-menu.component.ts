import { Component, computed, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrl: './cart-menu.component.scss'
})
export class CartMenuComponent implements OnInit {

  binIcon: string = 'https://img.icons8.com/?size=100&id=47258&format=png&color=c3c3c3';
  binIconHovered: string = 'https://img.icons8.com/?size=100&id=47258&format=png&color=000000';

  removeIcon!: string;

  constructor(
    public cartService: CartService
  ) { }

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
