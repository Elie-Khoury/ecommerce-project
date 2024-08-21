import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { AdminTableComponent } from "./components/admin-table/admin-table.component";

@NgModule({
    declarations: [
        AdminDashboardComponent,
    ],
    imports: [
        AdminTableComponent
    ],
})
export class AdminModule { }