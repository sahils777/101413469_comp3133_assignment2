import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employee: Omit<Employee, 'id'> = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: 0,
    department: '',
    employee_photo: ''
  };

  errorMessage: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';

    if (
      !this.employee.first_name ||
      !this.employee.last_name ||
      !this.employee.email ||
      !this.employee.gender ||
      !this.employee.designation ||
      !this.employee.salary ||
      !this.employee.department
    ) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    if (this.employee.salary < 1000) {
      this.errorMessage = 'Salary must be at least $1000';
      return;
    }

    this.employeeService.addEmployee({ ...this.employee, id: '' }).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (error) => {
        console.error('❌ Error adding employee:', error);
        const graphqlError = error?.graphQLErrors?.[0]?.message || error?.message;

        if (graphqlError?.toLowerCase().includes('duplicate key') || graphqlError?.includes('E11000')) {
          this.errorMessage = 'This email is already registered. Please use a different one.';
        } else if (graphqlError?.toLowerCase().includes('salary')) {
          this.errorMessage = 'Salary must be at least $1000';
        } else {
          this.errorMessage = graphqlError || 'Failed to add employee';
        }
      }
    });
  }

}
