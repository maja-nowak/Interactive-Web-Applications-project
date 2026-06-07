import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import {StudentComponent} from './student/student.component';
import {RoleGuard} from './guards/role.guard';
import {Admin} from './admin/admin';
import {TeacherComponent} from './teacher/teacher.component'

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  },
  {path: 'student', component: StudentComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_STUDENT'] }, runGuardsAndResolvers: 'always'},
  {path: 'teacher', component: TeacherComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TEACHER'] }, runGuardsAndResolvers: 'always'},
  {path: 'admin', component: Admin, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMIN'] }, runGuardsAndResolvers: 'always'},
  {path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];
