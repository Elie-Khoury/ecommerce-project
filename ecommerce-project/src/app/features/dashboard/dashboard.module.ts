import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductsSwiperComponent } from '../../shared/components/products-swiper/products-swiper.component';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HeroComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ProductsSwiperComponent,
    CoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
