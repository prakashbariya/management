import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppConfig} from './config/app.config';
import {DepartmetListComponent} from "./department/department-list/department-list.component";


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: DepartmetListComponent},
  {path: AppConfig.routes.employees, loadChildren: './employee/employees.module#EmployeesModule'},
  {path: AppConfig.routes.department, loadChildren: './department/department.module#DepartmetsModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
