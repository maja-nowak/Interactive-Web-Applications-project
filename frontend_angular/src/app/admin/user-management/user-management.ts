import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { User } from '../../models/user.model';
import { AdminService, UserRequest } from '../../services/admin.service';
import { UserFormComponent } from '../user-form/user-form';

@Component({
  selector: 'app-user-management',
  imports: [FormsModule, NgForOf, NgIf, UserFormComponent],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagementComponent {
  @Input() users: User[] = [];
  @Output() usersChanged = new EventEmitter<void>();

  editingUser?: User;
  addingUser: boolean = false;
  selectedRole: string = '';
  sortField: 'name' | 'lastName' | 'id' = 'id';
  sortAscending: boolean = true;

  private adminService = inject(AdminService);

  get filteredAndSortedUsers(): User[] {
    let filtered = this.users;
    if (this.selectedRole) {
      filtered = filtered.filter(u =>
        u.role?.name?.toLowerCase().includes(this.selectedRole.toLowerCase())
      );
    }
    return filtered.sort((a, b) => {
      if (this.sortField === 'id') {
        const idA = Number(a.id) || 0;
        const idB = Number(b.id) || 0;
        return this.sortAscending ? idA - idB : idB - idA;
      }
      const fieldA = a[this.sortField]?.toString().toLowerCase() || '';
      const fieldB = b[this.sortField]?.toString().toLowerCase() || '';
      if (fieldA < fieldB) return this.sortAscending ? -1 : 1;
      if (fieldA > fieldB) return this.sortAscending ? 1 : -1;
      return 0;
    });
  }

  startEditUser(user: User): void {
    this.editingUser = user;
    this.addingUser = false;
  }

  startAddUser(): void {
    this.addingUser = true;
    this.editingUser = undefined;
  }

  handleSaveUser(userRequest: any): void {
    if (this.addingUser) {
      this.adminService.createAdmin(userRequest).subscribe({
        next: () => {
          this.usersChanged.emit();
          this.addingUser = false;
        },
        error: err => alert('Error creating user: ' + err.message)
      });
    } else if (this.editingUser) {
      this.adminService.updateUser(this.editingUser.id!, userRequest).subscribe({
        next: () => {
          this.usersChanged.emit();
          this.editingUser = undefined;
        },
        error: err => console.error('Error updating user:', err)
      });
    }
  }

  handleCancelUser(): void {
    this.addingUser = false;
    this.editingUser = undefined;
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      this.adminService.deleteUser(user.id!).subscribe({
        next: () => this.usersChanged.emit(),
        error: err => {
          const errorMessage = err.error?.error || 'Cannot delete this user';
          alert(errorMessage);
        }
      });
    }
  }
}
