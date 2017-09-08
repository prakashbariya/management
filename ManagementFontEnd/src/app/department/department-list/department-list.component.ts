///<reference path="../shared/department.service.ts"/>
import {Component, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';
import {Departmet} from "../shared/department.model";
import {DepartmetService} from "../shared/department.service";


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})

export class DepartmetListComponent {
  departmets : Departmet[];
  newDepartmetForm: FormGroup;
  canVote = false;
  editTitle="Create";
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private departmetService: DepartmetService,
              private dialog: MdDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.canVote = this.departmetService.checkIfUserCanVote();

    this.newDepartmetForm = this.formBuilder.group({
      'departmentId': ['', []],
      'name': ['', [Validators.required]]
    });

    this.departmetService.getAllDepartmets().subscribe((departmets: Array<Departmet>) => {
      this.departmets = departmets;
      /*this.employees = employeees.sort((a, b) => {
        return b.likes - a.likes;
      });*/
    });
  }

  like(departmet: Departmet) {
    this.departmetService.like(departmet).subscribe(() => {
      this.canVote = this.departmetService.checkIfUserCanVote();
    }, (error: Response) => {
      LoggerService.error('maximum votes limit reached', error);
    });
  }
  edit(departmet: Departmet) {
    this.editTitle="Upadate"
    this.newDepartmetForm = this.formBuilder.group({
      'departmentId': [departmet.departmentId, []],
      'name': [departmet.name, [Validators.required]]
    });
  }

  createNewDepartmet(newDepartmet: any) {
    console.log(newDepartmet);
    if(this.editTitle!="Upadate")
    {
      this.departmetService.createDepartmet(newDepartmet).subscribe((newDepartmetWithId) => {
        this.departmets.push(newDepartmet);
        this.myNgForm.resetForm();
      }, (response: Response) => {
        console.log("error");
        if (response.status === 500) {
          this.error = 'errorHasOcurred';
        }
      });
    }else
    {
      this.departmetService.updateDepartmet(newDepartmet).subscribe((newDepartmetWithId) => {
        for (let emp of this.departmets) {
          if(emp.departmentId==newDepartmetWithId.departmentId)
          {
            emp.name=newDepartmetWithId.name;
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

  seeDepartmetDetails(departmet): void {
    if (departmet.default) {
      this.router.navigate([AppConfig.routes.Departmets + '/' + departmet.departmentId]);
    }
  }

  remove(departmetToRemove: Departmet): void {
    let dialogRef = this.dialog.open(RemoveDepartmetDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.departmetService.deleteDepartmetById(departmetToRemove.departmentId).subscribe(() => {
          //this.employeeService.showSnackBar('employeeRemove');
          this.departmets = this.departmets.filter(departmet => departmet.departmentId !== departmetToRemove.departmentId);
        }, (response: Response) => {
          if (response.status === 500) {
            this.error = 'departmetDefault';
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

export class RemoveDepartmetDialogComponent {
  constructor() {
  }
}
