import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeesComponent} from "./employees.component";

const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {path: '', component: EmployeeListComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(employeesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class EmployeeRoutingModule {
}
