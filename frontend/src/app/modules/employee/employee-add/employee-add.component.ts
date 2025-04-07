import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee, EmployeeInput } from '../../../core/models/employee.model';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employee: Partial<Employee> = {};
  selectedFile?: File;
  previewUrl?: string;
  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee?: Employee }
  ) {
    if (data?.employee) {
      this.employee = { ...data.employee };
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      // Create preview
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('profilePicture') as HTMLInputElement;
    fileInput?.click();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    this.isLoading = true;
    const employeeData = { ...this.employee };

    if (this.selectedFile) {
      this.employeeService.uploadProfilePicture(employeeData._id!, this.selectedFile)
        .subscribe(url => {
          employeeData.profilePicture = url;
          this.saveEmployee(employeeData);
        });
    } else {
      this.saveEmployee(employeeData);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private saveEmployee(employeeData: Partial<Employee>): void {
    const operation = employeeData._id
      ? this.employeeService.updateEmployee(employeeData._id, employeeData)
      : this.employeeService.addEmployee(employeeData as EmployeeInput);

    operation.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
