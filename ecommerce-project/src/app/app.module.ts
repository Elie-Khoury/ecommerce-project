import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/auth/state/effects/auth.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './core/auth/login-reg/login-reg.component';
import { RegCardComponent } from './core/auth/login-reg/reg-card/reg-card.component';
import { LoginCardComponent } from './core/auth/login-reg/login-card/login-card.component';
import { NavbarComponent } from './core/app-shell/navbar/navbar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthInterceptorService } from './core/auth/services/auth-interceptor.service';
import { ProfileComponent } from './features/profile/profile.component';
import { authReducer } from './core/auth/state/reducers/auth.reducer';
import { HeroComponent } from './features/dashboard/components/hero/hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsSwiperComponent } from './shared/components/products-swiper/products-swiper.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponent,
    RegCardComponent,
    LoginCardComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ auth: authReducer }),
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
    }),
    EffectsModule.forRoot(AuthEffects),
    HttpClientModule,
    BrowserAnimationsModule,
    ProductsSwiperComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
