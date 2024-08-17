import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginRegComponent } from './core/auth/login-reg/login-reg.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard } from './core/auth/services/auth.guard';
import { CollectionComponent } from './features/products/pages/collection/collection.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { AccountDetailsComponent } from './features/profile/pages/account-details/account-details.component';
import { PaymentDetailsComponent } from './features/profile/pages/payment-details/payment-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginRegComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'collection/product/:id', component: ProductDetailsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'profile/account-details', component: AccountDetailsComponent, canActivate: [authGuard] },
  { path: 'profile/payment-details', component: PaymentDetailsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // scroll to the top on route change
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
