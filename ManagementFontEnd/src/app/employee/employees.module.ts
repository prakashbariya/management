import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeeRoutingModule} from "./employees-routing.module";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {RemoveEmployeeDialogComponent} from "./employee-list/employee-list.component";
import {EmployeeService} from "./shared/employee.service";
import {EmployeesComponent} from "./employees.component";
import {DepartmetsModule} from "../department/department.module";
import {MaterialModule} from "../shared/modules/material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    DepartmetsModule,
  ],
  declarations: [
    EmployeesComponent,
    EmployeeListComponent,
    RemoveEmployeeDialogComponent
  ],
  entryComponents: [
    RemoveEmployeeDialogComponent
  ],
  providers: [
    EmployeeService
  ]
})

export class EmployeesModule {
}
