import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ClientRoutingModule } from "./client-routing.module";
import { ClientComponent } from "./client.component";
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        ClientComponent,
        HomeComponent,
    ],
    imports: [
        SharedModule,
        ClientRoutingModule
    ]
})
export class ClientModule {}