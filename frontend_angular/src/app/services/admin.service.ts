import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { Subject } from '../models/subject.model';
import { User } from '../models/user.model';
import { RoleName } from '../models/role-name.enum';

export interface SubjectRequest {
  name: string;
  description: string;
  teacherId?: number;
}

export interface UserRequest {
  name?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/subjects`).pipe(catchError(this.handleError));
  }

  createSubject(request: SubjectRequest): Observable<Subject> {
    return this.http.post<Subject>(`${this.baseUrl}/subjects`, request).pipe(catchError(this.handleError));
  }

  updateSubject(id: number, request: SubjectRequest): Observable<Subject> {
    return this.http.put<Subject>(`${this.baseUrl}/subjects/${id}`, request).pipe(catchError(this.handleError));
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/subjects/${id}`, {
      responseType: 'text' as const
    }).pipe(catchError(this.handleError));
  }

  assignTeacherToSubject(subjectId: number, teacherId: number): Observable<any> {
    const params = new HttpParams().set('teacherId', teacherId.toString());
    return this.http.post(`${this.baseUrl}/subjects/${subjectId}/assign-teacher`, null, {
      params,
      responseType: 'text' as const
    }).pipe(catchError(this.handleError));
  }

  removeTeacherFromSubject(subjectId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/subjects/${subjectId}/remove-teacher`, {
      responseType: 'text' as const
    }).pipe(catchError(this.handleError));
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`).pipe(catchError(this.handleError));
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}/teachers`).pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(catchError(this.handleError));
  }

  createAdmin(request: UserRequest): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/create-admin`, request).pipe(catchError(this.handleError));
  }

  updateUser(id: number, request: UserRequest): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, request).pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage += `\nDetails: ${error.error}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
