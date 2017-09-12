///<reference path="../shared/employee.service.ts"/>
import {Component, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Departmet} from "../../department/shared/department.model";
import {DepartmetService} from "../../department/shared/department.service";
import {Employee} from "../shared/employee.model";
import {EmployeeService} from "../shared/employee.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent {
  employees : Employee[];
  departmets : Departmet[];
  newEmployeeForm: FormGroup;
  canVote = false;
  editTitle="Create";
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private employeeService: EmployeeService,
              private departmetService: DepartmetService,
              private dialog: MdDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.canVote = this.employeeService.checkIfUserCanVote();

    this.newEmployeeForm = this.formBuilder.group({
      'employeeId': ['', []],
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'department': ['', [Validators.required]]

    });

    this.employeeService.getAllEmployees().subscribe((employeees: Array<Employee>) => {
      this.employees = employeees;
    });
    this.departmetService.getAllDepartmets().subscribe((departmets: Array<Departmet>) => {
      this.departmets = departmets;
    });
  }

  edit(employee: Employee) {
    this.editTitle="Upadate"
    let dmpName ="";
    for (let departmet of this.departmets){
      for (let emp of departmet.employees) {
        if (emp.employeeId == employee.employeeId) {
          dmpName = departmet.name;
        }
      }
    }
    this.newEmployeeForm = this.formBuilder.group({
      'employeeId': [employee.employeeId, []],
      'name': [employee.name, [Validators.required]],
      'email': [employee.email, [Validators.required]],
      'department': [dmpName, [Validators.required]]
    });
  }

  createNewEmployee(newEmployee: any) {

    let dep= new Departmet(null,newEmployee.department,null);
    for (let departmet of this.departmets) {
      if(departmet.name==newEmployee.department)
      {
        dep.departmentId=departmet.departmentId;
      }
    }
    let emp =new Employee(newEmployee.employeeId,newEmployee.name,newEmployee.email,dep);
    console.log(newEmployee);
    if(this.editTitle!="Upadate")
    {
      this.employeeService.createEmployee(emp).subscribe((newEmployeeWithId) => {
        this.employees.push(emp);
        this.myNgForm.resetForm();
      }, (response: Response) => {
        console.log("error");
        if (response.status === 500) {
          this.error = 'errorHasOcurred';
        }
      });
    }else
    {
      this.employeeService.updateEmployee(emp).subscribe((newEmployeeWithId) => {
        for (let emp of this.employees) {
          if(emp.employeeId==newEmployeeWithId.employeeId)
          {
            emp.name=newEmployeeWithId.name;
          }
        }
        this.editTitle="Create";
        this.myNgForm.resetForm();
      }, (response: Response) => {
        console.log("error");
        if (response.status === 500) {
          this.error = 'errorHasOcurred';
        }
      });
    }
  }
  remove(employeeToRemove: Employee): void {
    let dialogRef = this.dialog.open(RemoveEmployeeDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.deleteEmployeeById(employeeToRemove.employeeId).subscribe(() => {
          //this.employeeService.showSnackBar('employeeRemove');
          this.employees = this.employees.filter(employee => employee.employeeId !== employeeToRemove.employeeId);
        }, (response: Response) => {
          if (response.status === 500) {
            this.error = 'employeeDefault';
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-remove-employee-dialog',
  templateUrl: './remove-employee.dialog.html',
})

export class RemoveEmployeeDialogComponent {
  constructor() {
  }
}
