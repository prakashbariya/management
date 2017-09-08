
import {Departmet} from "../../department/shared/department.model";
export class Employee {
  constructor(public employeeId: number,
              public name: string,
              public email: string,
              public department: Departmet) {
  }
}
