import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmetsComponent} from "./department.component";
import {DepartmetListComponent} from "./department-list/department-list.component";

const departmetsRoutes: Routes = [
  {
    path: '',
    component: DepartmetsComponent,
    children: [
      {path: '', component: DepartmetListComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(departmetsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DepartmetRoutingModule {
}
