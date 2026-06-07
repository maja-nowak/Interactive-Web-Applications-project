import {Component, inject, OnInit} from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Subject } from '../models/subject.model';
import { TokenStorageService } from '../auth/token-storage';
import { FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacherId!: number;
  subjects: Subject[] = [];
  enrollments: EnrollmentInfoRequest[] = [];
  selectedSubjectId?: number;

  private teacherService = inject(TeacherService);
  private tokenStorage = inject(TokenStorageService)

  ngOnInit(): void {
    this.teacherId = this.tokenStorage.getId();
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.teacherService.getTeacherSubjects(this.teacherId).subscribe({
      next: (data) => this.subjects = data,
      error: (err) => console.error('Error loading subjects', err)
    });
  }

  loadEnrollments(subjectId: number): void {
    this.teacherService.getSubjectEnrollments(subjectId).subscribe({
      next: (enrollments) => {
        this.enrollments = enrollments;
        console.log('Enrollments:', enrollments);
      },
      error: (err) => console.error('Error loading enrollments', err)
    });
  }


  assignGrade(enrollmentId: number, grade: number): void {
    const validationResult = this.validateGrade(grade);
    if (!validationResult.isValid) {
      alert(validationResult.errorMessage);
      return;
    }

    this.teacherService.assignGrade(enrollmentId, grade).subscribe({
      next: () => {
        alert('Grade assigned successfully');
        if (this.selectedSubjectId) {
          this.loadEnrollments(this.selectedSubjectId);
        }
      },
      error: (error) => {
        console.error('Error assigning grade:', error);
        alert('Failed to assign grade. Please try again.');
      }
    });

  }

  private validateGrade(grade: number): { isValid: boolean; errorMessage: string } {
    if (grade === null || grade === undefined || isNaN(grade)) {
      return {
        isValid: false,
        errorMessage: 'Please enter a valid grade'
      };
    }
    if (grade < 2 || grade > 5) {
      return {
        isValid: false,
        errorMessage: 'Grade must be between 2 and 5'
      };
    }
    if ((grade * 2) % 1 !== 0) {
      return {
        isValid: false,
        errorMessage: 'Grade must be in 0.5 increments (2, 2.5, 3, 3.5, 4, 4.5, 5)'
      };
    }

    return {
      isValid: true,
      errorMessage: ''
    };
  }

  stopTeaching(subjectId: number): void {
    this.teacherService.stopTeachingSubject(this.teacherId, subjectId).subscribe({
      next: () => {
        this.loadSubjects();
        this.enrollments = [];
      },
      error: (err) => alert('Failed to stop teaching: ' + err.message)
    });
  }
}
