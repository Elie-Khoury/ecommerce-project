import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './app-shell/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { CartMenuComponent } from './app-shell/cart-menu/cart-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './app-shell/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeComponent } from './app-shell/badge/badge.component';
import { ChatBotComponent } from './app-shell/chat-bot/chat-bot.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CartMenuComponent,
    FooterComponent,
    BadgeComponent,
    ChatBotComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    CartMenuComponent,
    FooterComponent,
    ChatBotComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
