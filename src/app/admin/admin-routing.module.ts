import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { AdminComponent } from "./admin.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { UserComponent } from "./user/user.component";
const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            {
                path: 'user', component: UserComponent, children: [
                    { path: '', component: UserListComponent },
                    { path: ':id', component: UserDetailsComponent }
                ]
            },
            { path: '**', component: PageNotFoundComponent }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }