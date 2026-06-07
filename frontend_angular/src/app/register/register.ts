import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { SignupInfo } from '../auth/signup-info';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true
})
export class Register {
  registerForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  submit() {
    if (this.registerForm.valid) {
      const signupInfo = new SignupInfo(
        this.registerForm.get('username')?.value,
        this.registerForm.get('password')?.value,
        this.registerForm.get('name')?.value,
        this.registerForm.get('lastName')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('role')?.value
      );

      this.authService.signUp(signupInfo).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          console.error('Registration error', err);
          alert('Error registering user: ' + (err.error?.message || 'Unknown error'));
        }
      });
    }
  }
}
