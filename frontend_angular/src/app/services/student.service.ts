import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';
import { Enrollment } from '../models/enrollment.model';
import {StudentSubjectInfoRequest} from '../dto/student-subject-info-request';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/students';
  constructor(private http: HttpClient) { }

  getGrades(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}/${studentId}/grades`);
  }

  getEnrolledSubjects(studentId: number): Observable<StudentSubjectInfoRequest[]> {
    return this.http.get<StudentSubjectInfoRequest[]>(`${this.apiUrl}/${studentId}/subjects`);
  }

  getAvailableSubjectsForStudent(studentId: number): Observable<StudentSubjectInfoRequest[]> {
    return this.http.get<StudentSubjectInfoRequest[]>(`${this.apiUrl}/${studentId}/subjects/available`);
  }

  enrollInSubject(studentId: number, subjectId: number): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiUrl}/${studentId}/enroll`, { subjectId });
  }

  unenrollFromSubject(studentId: number, subjectId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${studentId}/unenroll`, {
      body: { subjectId },
      responseType: 'text' as const
    });
  }
}
