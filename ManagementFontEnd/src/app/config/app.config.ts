import {OpaqueToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    heroes: 'heroes',
    employees: 'employees',
    department: 'department'
  },
  endpoints: {
    heroes: 'https://nodejs-example-app.herokuapp.com/heroes'
  },
  endEmployeepoints: {
    employees: 'http://18.220.205.15:8090/employee'
  },
  endDepartmentpoints: {
    department: 'http://18.220.205.15:8090/department'
  },
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/Ismaestro/angular4-example-app'
};
