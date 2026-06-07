import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Subject } from '../models/subject.model';
import { User } from '../models/user.model';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { StatsCardComponent } from './stats-card/stats-card';
import { TabNavigationComponent } from './tab-navigation/tab-navigation';
import { SubjectManagementComponent } from './subject-management/subject-management';
import { UserListComponent } from './user-list/user-list';
import { UserManagementComponent } from './user-management/user-management';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [
    NgIf,
    StatsCardComponent,
    TabNavigationComponent,
    SubjectManagementComponent,
    UserListComponent,
    UserManagementComponent
  ],
  templateUrl: './admin.html'
})

export class Admin implements OnInit {
  students: Student[] = [];
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  users: User[] = [];
  activeTab: 'subjects' | 'students' | 'teachers' | 'users' = 'subjects';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loadStudents();
    this.loadTeachers();
    this.loadSubjects();
    this.loadUsers();
  }

  loadStudents(): void {
    this.adminService.getAllStudents().subscribe({
      next: data => this.students = data,
      error: err => console.error('Error loading students:', err)
    });
  }

  loadTeachers(): void {
    this.adminService.getAllTeachers().subscribe({
      next: data => this.teachers = data,
      error: err => console.error('Error loading teachers:', err)
    });
  }

  loadSubjects(): void {
    this.adminService.getAllSubjects().subscribe({
      next: data => this.subjects = data,
      error: err => console.error('Error loading subjects:', err)
    });
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error('Error loading users:', err)
    });
  }

  onTabChanged(tab: 'subjects' | 'students' | 'teachers' | 'users'): void {
    this.activeTab = tab;
  }

  onUsersChanged() {
    this.loadUsers();
    this.loadStudents();
    this.loadTeachers();
  }
}
