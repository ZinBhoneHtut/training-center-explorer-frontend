import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from "primeng/inputmask";
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    declarations: [
    ],
    exports: [
        CommonModule,
        SkeletonModule,
        TableModule,
        ConfirmDialogModule,
        DropdownModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        SidebarModule,
        BadgeModule,
        BreadcrumbModule,
        ConfirmPopupModule,
        ToastModule,
        MultiSelectModule,
        InputMaskModule,
        RadioButtonModule
    ]
})
export class SharedModule {}
