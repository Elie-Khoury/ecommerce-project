import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginRegComponent } from './core/auth/login-reg/login-reg.component';
import { ProfileComponent } from './features/profile/profile.component';
import { authGuard } from './core/auth/services/auth.guard';
import { CollectionComponent } from './features/collection/collection.component';
import { ProductComponent } from './features/collection/components/product/product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginRegComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'collection/product/:id', component: ProductComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
