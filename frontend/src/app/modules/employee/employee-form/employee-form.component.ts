import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee?: Employee }
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      salary: [0, [Validators.required, Validators.min(0)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      profilePicture: [null]
    });
  }

  ngOnInit() {
    if (this.data?.employee) {
      this.form.patchValue(this.data.employee);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      let operation: Observable<any>;

      if (this.data?.employee) {
        operation = this.employeeService.updateEmployee(
          this.data.employee._id!,
          this.form.value
        );
      } else {
        operation = this.employeeService.createEmployee(
          this.form.value
        );
      }

      operation.subscribe({
        next: () => {
          this.isLoading = false;
          this.dialogRef.close(true);
        },
        error: (err: Error) => {
          this.isLoading = false;
          console.error('Operation failed:', err);
          // Add user notification here (e.g., MatSnackBar)
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.isLoading = true;
      const file = input.files[0];
      this.employeeService.uploadProfilePicture(file).subscribe({
        next: (result) => {
          this.isLoading = false;
          this.form.patchValue({
            profilePicture: result.data.uploadProfilePicture.url
          });
        },
        error: (err: Error) => {
          this.isLoading = false;
          console.error('Upload failed:', err);
          // Add user notification here
        }
      });
    }
  }
}
