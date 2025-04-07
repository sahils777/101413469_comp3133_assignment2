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
  isSubmitting = false; // Add loading state

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.isSubmitting = true;

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
      this.isSubmitting = false;
      return;
    }

    if (this.employee.salary < 1000) {
      this.errorMessage = 'Salary must be at least $1000';
      this.isSubmitting = false;
      return;
    }

     this.employeeService.addEmployee({ ...this.employee, id: '' }).subscribe({
    next: () => this.router.navigate(['/employees']),
    error: (error) => {
      console.error('Raw error:', error); // Check this in console

      // Simple error extraction
      if (error.graphQLErrors?.[0]?.message.includes('E11000')) {
        this.errorMessage = 'This email is already taken!';
      } else {
        this.errorMessage = error.message || 'Failed to add employee';
      }

      this.isSubmitting = false;
    }
    });
  }
}
