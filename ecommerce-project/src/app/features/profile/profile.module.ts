import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile.component";
import { AddClassIfRequiredDirective } from './utilities/add-class-if-required.directive';
import { CoreModule } from "../../core/core.module";

@NgModule({
    declarations: [ProfileComponent, AddClassIfRequiredDirective],
    imports: [
        CoreModule
    ],
})
export class ProfileModule { }