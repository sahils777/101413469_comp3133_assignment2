import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '../../../core/services/notification.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private authSubscription?: Subscription;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;
  isApolloAvailable = true;

  ngOnInit() {
    // Verify AuthService is properly initialized
    if (!this.auth) {
      console.error('AuthService not properly injected');
      this.isApolloAvailable = false;
      this.notification.showError('System error. Please try again later.');
    }
  }

  onSubmit() {
    if (this.loginForm.invalid || !this.isApolloAvailable) {
      if (!this.isApolloAvailable) {
        this.notification.showError('System configuration error. Please contact support.');
      }
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authSubscription = this.auth.login(email, password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/employees']);
        } else {
          this.notification.showError('Invalid credentials');
        }
      },
      error: (err) => {
        let errorMessage = 'Login failed. Please try again.';

        // Handle specific Apollo errors
        if (err.message.includes('Apollo')) {
          errorMessage = 'System error. Please contact support.';
          console.error('Apollo GraphQL error:', err);
        }

        this.notification.showError(errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
