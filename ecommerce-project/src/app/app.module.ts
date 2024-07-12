import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './features/login-reg/login-reg.component';
import { RegCardComponent } from './features/login-reg/reg-card/reg-card.component';
import { LoginCardComponent } from './features/login-reg/login-card/login-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponent,
    RegCardComponent,
    LoginCardComponent
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
