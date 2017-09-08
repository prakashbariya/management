import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {AppConfig} from '../../config/app.config';

import {Observable} from 'rxjs/Observable';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {LoggerService} from '../../core/logger.service';
import {Departmet} from "./department.model";


@Injectable()
export class DepartmetService {
  request$: EventEmitter<any>;

  private headers: HttpHeaders;
  private departmetsUrl: string;
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

    this.departmetsUrl = AppConfig.endDepartmentpoints.department;
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});

    //this.translateService.get(['heroCreated', 'saved', 'heroLikeMaximum', 'heroRemoved'], {
    //  'value': AppConfig.votesLimit
    //}).subscribe((texts) => {
    //  this.translations = texts;
    //});
  }

  getAllDepartmets(): Observable<Departmet[]> {
    this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.departmetsUrl)
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  getDepartmetById(departmetId: string): Observable<Departmet> {
    this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    return this.http.get(this.departmetsUrl + '/' + departmetId)
      .map(response => {
        this.request$.emit('finished');
        return response;
      })
      .catch(error => this.handleError(error));
  }

  createDepartmet(departmet: any): Observable<Departmet> {

    console.log("okkkk");

    this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    return this.http
      .post(this.departmetsUrl, JSON.stringify({
        name: departmet.name,
        email: departmet.email
      }), {headers: this.headers})
      .map(response => {
        //this.request$.emit('finished');
        //this.showSnackBar('employeeCreated');
        console.log(response);
        return response;
      })
      .catch(error => this.handleError(error));
  }

  updateDepartmet(departmet: any): Observable<Departmet> {

    this.request$.emit('starting');
    //noinspection TypeScriptUnresolvedFunction
    //const url = `${this.departmetsUrl}/${departmet.id}`;
    return this.http
        .put(this.departmetsUrl, JSON.stringify(departmet), {headers: this.headers})
        .map(response => {
          //this.request$.emit('finished');
          //this.showSnackBar('employeeCreated');
          console.log(response);
          return response;
        })
        .catch(error => this.handleError(error));
  }


  like(departmet: Departmet) {
    if (this.checkIfUserCanVote()) {
      this.request$.emit('starting');
      const url = `${this.departmetsUrl}/${departmet.departmentId}/like`;
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

  deleteDepartmetById(id: any): Observable<Array<Departmet>> {
    this.request$.emit('starting');
    const url = `${this.departmetsUrl}/${id}`;
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
