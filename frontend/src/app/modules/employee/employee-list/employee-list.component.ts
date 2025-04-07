import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { NotificationService } from '../../../core/services/notification.service';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns = ['name', 'email', 'department', 'position', 'actions'];
  departments = ['HR', 'IT', 'Finance', 'Marketing'];
  positions = ['Manager', 'Developer', 'Designer', 'Analyst'];

  searchCriteria = {
    department: '',
    position: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees: Employee[]) => this.employees = employees,
      error: (err: Error) => this.notification.showError('Failed to load employees')
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.loadEmployees();
    });
  }

  searchEmployees(): void {
    this.employeeService.searchEmployees(this.searchCriteria).subscribe({
      next: (employees: Employee[]) => this.employees = employees,
      error: (err: Error) => this.notification.showError('Search failed')
    });
  }

  clearSearch(): void {
    this.searchCriteria = { department: '', position: '' };
    this.loadEmployees();
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.notification.showSuccess('Employee deleted');
          this.loadEmployees();
        },
        error: (err: Error) => this.notification.showError('Delete failed')
      });
    }
  }
}
