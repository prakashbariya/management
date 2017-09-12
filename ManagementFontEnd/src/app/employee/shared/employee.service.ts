import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import {Observable} from 'rxjs/Observable';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {LoggerService} from '../../core/logger.service';
import {Employee} from "./employee.model";

@Injectable()
export class EmployeeService {
  request$: EventEmitter<any>;

  private headers: HttpHeaders;
  private employeesUrl: string;
  private translations: any;

  private handleError(error: any) {
    this.request$.emit('finished');
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  constructor(private http: HttpClient,
              private snackBar: MdSnackBar) {
    this.request$ = new EventEmitter();

    this.employeesUrl = AppConfig.endEmployeepoints.employees;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    //this.translateService.get(['heroCreated', 'saved', 'heroLikeMaximum', 'heroRemoved'], {
    //  'value': AppConfig.votesLimit
    //}).subscribe((texts) => {
    //  this.translations = texts;
    //});
  }

  getAllEmployees(): Observable<Employee[]> {
    this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.employeesUrl)
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  getEmployeeById(employeeId: string): Observable<Employee> {
    this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.employeesUrl + '/' + employeeId)
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  createEmployee(employee: any): Observable<Employee> {


    //this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    return this.http
      .post(this.employeesUrl, JSON.stringify(employee), {headers: this.headers})
      .map(response => {
        //this.request$.emit('finished');
        //this.showSnackBar('employeeCreated');
        console.log(response);
        return response;
      })
      .catch(error => this.handleError(error));
  }

  updateEmployee(employee: any): Observable<Employee> {

    this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    return this.http
        .put(this.employeesUrl, JSON.stringify(employee), {headers: this.headers})
        .map(response => {
          //this.request$.emit('finished');
          //this.showSnackBar('employeeCreated');
          console.log(response);
          return response;
        })
        .catch(error => this.handleError(error));
  }


  like(employee: Employee) {
    if (this.checkIfUserCanVote()) {
      this.request$.emit('starting');
      const url = `${this.employeesUrl}/${employee.employeeId}/like`;
      //noinspection TypeScriptUnresolvedFunction
      return this.http
        .post(url, {}, {headers: this.headers})
        .map((response) => {
          /*this.request$.emit('finished');
          localStorage.setItem('votes', '' + (Number(localStorage.getItem('votes')) + 1));
          employee.likes += 1;
          this.showSnackBar('saved');*/
          return response;
        })
        .catch(error => this.handleError(error));
    } else {
      this.showSnackBar('employeeLikeMaximum');
      return Observable.throw('maximum votes');
    }
  }

  checkIfUserCanVote(): boolean {
    return Number(localStorage.getItem('votes')) < AppConfig.votesLimit;
  }

  deleteEmployeeById(id: any): Observable<Array<Employee>> {
    this.request$.emit('starting');
    const url = `${this.employeesUrl}/${id}`;
    //noinspection TypeScriptUnresolvedFunction
    return this.http.delete(url, {headers: this.headers})
      .map((response) => {
        //this.request$.emit('finished');
        //this.showSnackBar('employeeRemoved');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  showSnackBar(name): void {
    const config: any = new MdSnackBarConfig();
    config.duration = AppConfig.snackBarDuration;
    this.snackBar.open(this.translations[name], 'OK', config);
  }
}
