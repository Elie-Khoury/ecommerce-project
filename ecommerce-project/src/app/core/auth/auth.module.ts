import { NgModule } from "@angular/core";
import { LoginRegComponent } from "./login-reg/login-reg.component";
import { RegCardComponent } from "./login-reg/reg-card/reg-card.component";
import { LoginCardComponent } from "./login-reg/login-card/login-card.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../core.module";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
        LoginRegComponent,
        RegCardComponent,
        LoginCardComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
    ],
})
export class AuthModule {

}