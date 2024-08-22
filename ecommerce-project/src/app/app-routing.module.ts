import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginRegComponent } from './core/auth/login-reg/login-reg.component';
import { authGuard } from './core/auth/services/auth.guard';
import { CollectionComponent } from './features/products/pages/collection/collection.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';
import { adminGuard } from './core/auth/services/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'admin', canActivate: [adminGuard], loadChildren: () => import('./features/admin-dashboard/admin.module').then(m => m.AdminModule) },
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginRegComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'collection/product/:id', component: ProductDetailsComponent },
  { path: 'profile', canActivate: [authGuard], loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // scroll to the top on route change
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
