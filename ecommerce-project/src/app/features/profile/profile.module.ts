import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { AddClassIfRequiredDirective } from './utilities/add-class-if-required.directive';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';
import { authGuard } from "../../core/auth/services/auth.guard";
import { ProfileDashboardComponent } from './pages/profile-dashboard/profile-dashboard.component';

const routes: Routes = [
    {
        path: '', component: ProfileComponent, canActivate: [authGuard], children: [
            { path: '', component: ProfileDashboardComponent, canActivate: [authGuard] },
            { path: 'account-details', component: AccountDetailsComponent, canActivate: [authGuard] },
            { path: 'payment-details', component: PaymentDetailsComponent, canActivate: [authGuard] }
        ]
    },
]

@NgModule({
    declarations: [
        ProfileComponent,
        AddClassIfRequiredDirective,
        AccountDetailsComponent,
        PaymentDetailsComponent,
        ProfileDashboardComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    ],
})
export class ProfileModule { }