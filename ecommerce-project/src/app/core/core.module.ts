import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './app-shell/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { CartMenuComponent } from './app-shell/cart-menu/cart-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { FooterComponent } from './app-shell/footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CartMenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent,
    CartMenuComponent,
    FooterComponent
  ],
})
export class CoreModule { }
