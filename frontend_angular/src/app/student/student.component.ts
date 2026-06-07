import {Component, inject, OnInit} from '@angular/core';
import { StudentService } from '../services/student.service';
import { Subject } from '../models/subject.model';
import { Enrollment } from '../models/enrollment.model';
import {NgIf, NgForOf, CommonModule} from '@angular/common';
import {TokenStorageService} from '../auth/token-storage';
import {StudentSubjectInfoRequest} from '../dto/student-subject-info-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {

  studentId!: number;
  enrolledSubjects: StudentSubjectInfoRequest[] = [];
  availableSubjects: StudentSubjectInfoRequest[] = [];
  grades: Enrollment[] = [];
  errorMessage = '';

  private studentService = inject(StudentService);
  private tokenStorage = inject(TokenStorageService);

  ngOnInit(): void {
    this.studentId = this.tokenStorage.getId();
    this.loadStudentData();
  }

  loadStudentData(): void {
    this.getEnrolledSubjects();
    this.getAvailableSubjects();
    this.getGrades();
  }

  getEnrolledSubjects(): void {
    this.studentService.getEnrolledSubjects(this.studentId).subscribe({
      next: (subjects) => this.enrolledSubjects = subjects,
      error: () => this.errorMessage = 'Failed to load enrolled subjects'
    });
  }

  getAvailableSubjects(): void {
    this.studentService.getAvailableSubjectsForStudent(this.studentId).subscribe({
      next: (subjects) => this.availableSubjects = subjects,
      error: () => this.errorMessage = 'Failed to load available subjects'
    });
  }


  getGrades(): void {
    this.studentService.getGrades(this.studentId).subscribe({
      next: (enrollments) => this.grades = enrollments,
      error: () => this.errorMessage = 'Failed to load grades'
    });
  }

  enroll(subjectId: number): void {
    this.studentService.enrollInSubject(this.studentId, subjectId).subscribe({
      next: () => this.loadStudentData(),
      error: (err) => this.errorMessage = 'Enrollment failed: ' + err.error?.message || 'Unknown error'
    });
  }

  unenroll(subjectId: number): void {
    this.studentService.unenrollFromSubject(this.studentId, subjectId).subscribe({
      next: () => this.loadStudentData(),
      error: (err) => {
        this.errorMessage = 'Unenrollment failed: ' + (err?.error?.message || err.message);
      }
    });
  }
}
