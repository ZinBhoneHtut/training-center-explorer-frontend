import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { UserComponent } from "./user/user.component";
import { UserListComponent } from './user/user-list/user-list.component';
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { DropdownDirective } from "../shared/directives/dropdown.directive";
import { ListToCommaSeparatedStringPipe } from "../shared/pipes/list-to-comma-separated-string.pipe";
import { NumberOnlyDirective } from "../shared/directives/number-only.directive";

@NgModule({
    declarations: [
        NavbarComponent,
        AdminComponent,
        UserComponent,
        UserDetailsComponent,
        UserListComponent,
        SpinnerComponent,
        SidebarComponent,
        DropdownDirective,
        NumberOnlyDirective,
        ListToCommaSeparatedStringPipe
    ],
    imports: [
        AdminRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
