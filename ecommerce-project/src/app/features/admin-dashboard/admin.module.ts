import { NgModule } from "@angular/core";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { AdminTableComponent } from "./components/admin-table/admin-table.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: '', component: AdminDashboardComponent }
]

@NgModule({
    declarations: [
        AdminDashboardComponent,
    ],
    imports: [
        AdminTableComponent,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminModule { }