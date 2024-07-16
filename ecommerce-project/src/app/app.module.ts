import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './core/auth/login-reg/login-reg.component';
import { RegCardComponent } from './core/auth/login-reg/reg-card/reg-card.component';
import { LoginCardComponent } from './core/auth/login-reg/login-card/login-card.component';
import { NavbarComponent } from './core/app-shell/navbar/navbar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponent,
    RegCardComponent,
    LoginCardComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
