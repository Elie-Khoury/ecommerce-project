import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { AddClassIfRequiredDirective } from './utilities/add-class-if-required.directive';
import { CoreModule } from "../../core/core.module";
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [ProfileComponent, AddClassIfRequiredDirective, AccountDetailsComponent],
    imports: [
        CoreModule,
        RouterModule,
        ReactiveFormsModule
    ],
})
export class ProfileModule { }