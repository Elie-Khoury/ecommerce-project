import { Component } from '@angular/core';
import { ProductsSwiperComponent } from '../../shared/components/products-swiper/products-swiper.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  toDisplay: string | number = 7;

  constructor() { }
}
