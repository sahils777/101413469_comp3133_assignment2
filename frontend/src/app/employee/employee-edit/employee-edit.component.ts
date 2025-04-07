import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: (employee: Employee) => {
          this.employee = { ...employee };
        },
        error: (error) => {
          console.error('Error loading employee:', error);
          this.errorMessage = 'Failed to load employee data.';
        }
      });
    }
  }

  onSubmit(): void {
    if (this.employee && this.employee.id) {
      const updatedPayload = {
        id: this.employee.id,
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        email: this.employee.email,
        gender: this.employee.gender,
        designation: this.employee.designation,
        salary: this.employee.salary,
        department: this.employee.department,
        employee_photo: this.employee.employee_photo || ''
      };

      this.employeeService.updateEmployee(updatedPayload as any).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          this.errorMessage = error.message || 'Failed to update employee.';
        }
      });
    }
  }
}
