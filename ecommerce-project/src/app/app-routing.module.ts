import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginRegComponent } from './core/auth/login-reg/login-reg.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginRegComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
