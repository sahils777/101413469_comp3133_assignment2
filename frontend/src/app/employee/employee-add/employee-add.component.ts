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

    // Frontend validation
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

    // Attempt to add the employee
    this.employeeService.addEmployee({ ...this.employee, id: '' }).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (error) => {
        console.error('❌ Error adding employee:', error);

        // Handle backend email conflict (assuming your backend returns a message for it)
        if (
          error?.message?.includes('duplicate') ||
          error?.message?.toLowerCase().includes('email')
        ) {
          this.errorMessage = 'Email is already registered';
        } else {
          this.errorMessage = error.message || 'Failed to add employee';
        }
      }
    });
  }
}
