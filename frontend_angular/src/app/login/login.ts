import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage';
import { Router } from '@angular/router';
import { LoginInfo } from '../auth/login-info';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private tokenStorage = inject(TokenStorageService);
  private router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const loginInfo = new LoginInfo(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      );

      this.authService.attemptAuth(loginInfo).subscribe({
        next: (data) => {
          const rawAuthorities = data.authorities || [];
          const roles = rawAuthorities.map((role: any) => role.authority);

          this.tokenStorage.saveToken(data.token || '');
          this.tokenStorage.saveUsername(data.username || '');
          this.tokenStorage.saveAuthorities(roles);
          this.tokenStorage.saveId(data.id || 0);
          console.log(roles);

          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin']);
            });
          } else if (roles.includes('ROLE_TEACHER')) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/teacher']);
            });
          } else if (roles.includes('ROLE_STUDENT')) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/student']);
            });
          } else {
            this.router.navigate(['/']);
          }

        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Invalid credentials');
        }
      });
    }
  }
}
