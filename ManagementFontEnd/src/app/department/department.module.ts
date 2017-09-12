import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DepartmetsComponent} from "./department.component";
import {DepartmetListComponent} from "./department-list/department-list.component";
import {RemoveDepartmetDialogComponent} from "./department-list/department-list.component";
import {DepartmetService} from "./shared/department.service";
import {DepartmetRoutingModule} from "./department-routing.module";
import { ExpansionPanelsModule } from 'ng2-expansion-panels';
import {MaterialModule} from "../shared/modules/material.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    DepartmetRoutingModule,
    ReactiveFormsModule,
    ExpansionPanelsModule
  ],
  declarations: [
    DepartmetsComponent,
    DepartmetListComponent,
    RemoveDepartmetDialogComponent
  ],
  entryComponents: [
    RemoveDepartmetDialogComponent
  ],
  providers: [
    DepartmetService
  ]
})

export class DepartmetsModule {
}
