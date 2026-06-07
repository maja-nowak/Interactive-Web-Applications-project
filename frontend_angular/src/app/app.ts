import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TokenStorageService } from './auth/token-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'project';
  private roles: string[] = [];
  private tokenStorage = inject(TokenStorageService);

  get isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken() && this.tokenStorage.getToken() !== '{}';
  }

  get authority(): string | undefined {
    const roles = this.tokenStorage.getAuthorities();
    if (roles.includes('ROLE_ADMIN')) return 'admin';
    if (roles.includes('ROLE_STUDENT')) return 'student';
    if (roles.includes('ROLE_TEACHER')) return 'teacher';
    if (roles.length) return 'user';
    return undefined;
  }

  ngOnInit() {
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  get username(): string {
    return this.tokenStorage.getUsername();
  }
}

