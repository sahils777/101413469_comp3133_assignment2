import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  SEARCH_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPLOAD_PROFILE_PICTURE
} from '../graphql/operations';
import { GraphqlService } from './graphql.service';
import { Employee, EmployeeInput } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private graphql: GraphqlService) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.graphql.query<{ employees: Employee[] }>(GET_EMPLOYEES).pipe(
      map(result => result.employees)
    );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.graphql.query<{ employee: Employee }>(GET_EMPLOYEE, { id }).pipe(
      map(result => result.employee)
    );
  }

  searchEmployees(criteria: { department?: string; position?: string }): Observable<Employee[]> {
    return this.graphql.query<{ searchEmployees: Employee[] }>(
      SEARCH_EMPLOYEES,
      { department: criteria.department, position: criteria.position }
    ).pipe(
      map(result => result.searchEmployees)
    );
  }

  addEmployee(employee: EmployeeInput): Observable<Employee> {
    return this.graphql.mutate<{ addEmployee: Employee }>(
      ADD_EMPLOYEE,
      {
        first_name: employee.firstName,
        last_name: employee.lastName,
        email: employee.email,
        gender: employee.gender,
        salary: employee.salary,
        designation: employee.position,
        department: employee.department
      }
    ).pipe(
      map(result => result.addEmployee)
    );
  }

  updateEmployee(id: string, employee: Partial<EmployeeInput>): Observable<Employee> {
    return this.graphql.mutate<{ updateEmployee: Employee }>(
      UPDATE_EMPLOYEE,
      { id, input: employee }
    ).pipe(
      map(result => result.updateEmployee)
    );
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.graphql.mutate<{ deleteEmployee: Employee }>(DELETE_EMPLOYEE, { id }).pipe(
      map(result => result.deleteEmployee)
    );
  }

  uploadProfilePicture(id: string, file: File): Observable<string> {
    return this.graphql.mutate<{ uploadProfilePicture: string }>(
      UPLOAD_PROFILE_PICTURE,
      { id, file }
    ).pipe(
      map(result => result.uploadProfilePicture)
    );
  }
}
