import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {APP_CONFIG, AppConfig} from './config/app.config';

import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Departmet} from "./department/shared/department.model";
import {EmployeeService} from "./employee/shared/employee.service";
import {DepartmetListComponent} from "./department/department-list/department-list.component";
import {EmployeesModule} from "./employee/employees.module";
import {MaterialModule} from "./shared/modules/material.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    EmployeesModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    EmployeeService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
