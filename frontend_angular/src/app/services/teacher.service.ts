import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';
import { Enrollment } from '../models/enrollment.model';
import { GradeRequest } from '../dto/grade-request.dto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:8080/api/teachers';

  constructor(private http: HttpClient) {}

  getTeacherSubjects(teacherId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/${teacherId}/subjects`);
  }

  getSubjectEnrollments(subjectId: number): Observable<EnrollmentInfoRequest[]> {
    return this.http.get<EnrollmentInfoRequest[]>(`${this.apiUrl}/${subjectId}/subjects/enrollments`);
  }

  assignGrade(enrollmentId: number, grade: number): Observable<any> {
    const body: GradeRequest = { grade };
    return this.http.put(`${this.apiUrl}/enrollments/${enrollmentId}/grade`, body, {
      responseType: 'text' as const
    });
  }

  stopTeachingSubject(teacherId: number, subjectId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${teacherId}/subjects/${subjectId}`, {
      responseType: 'text' as const
    });
  }

}
