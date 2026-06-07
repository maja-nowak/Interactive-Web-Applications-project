import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../../models/user.model';
import { UserRequest } from '../../services/admin.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() editingUser?: User;
  @Output() save = new EventEmitter<UserRequest>();
  @Output() cancel = new EventEmitter<void>();

  userForm: UserRequest = {};

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingUser']) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    if (this.editingUser) {
      this.userForm = {
        name: this.editingUser.name,
        lastName: this.editingUser.lastName,
        username: this.editingUser.username,
        email: this.editingUser.email,
        role: this.editingUser.role?.name.replace('ROLE_', ''),
      };
    } else {
      this.userForm = {};
    }
  }

  onSave(): void {
    this.save.emit({ ...this.userForm });
  }

  onCancel(): void {
    this.cancel.emit();
  }
} 