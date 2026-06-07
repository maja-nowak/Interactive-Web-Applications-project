import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Subject } from '../../models/subject.model';
import { Teacher } from '../../models/teacher.model';
import { AdminService, SubjectRequest } from '../../services/admin.service';
import { SubjectFormComponent } from '../subject-form/subject-form';
import { SubjectListComponent } from '../subject-list/subject-list';

@Component({
  selector: 'app-subject-management',
  imports: [SubjectFormComponent, SubjectListComponent],
  templateUrl: './subject-management.html',
  styleUrl: './subject-management.css'
})

export class SubjectManagementComponent {
  @Input() subjects: Subject[] = [];
  @Input() teachers: Teacher[] = [];
  @Output() subjectsChanged = new EventEmitter<void>();

  editingSubject?: Subject;
  errorMessage = '';

  private adminService = inject(AdminService);

  onStartCreate(): void {
    this.editingSubject = undefined;
    this.errorMessage = '';
  }

  onStartEdit(subject: Subject): void {
    this.editingSubject = subject;
    this.errorMessage = '';
  }

  onCancelEdit(): void {
    this.editingSubject = undefined;
    this.errorMessage = '';
  }

  onSaveSubject(request: SubjectRequest): void {
    if (!request.name.trim()) {
      this.errorMessage = 'Subject name is required';
      return;
    }

    const cleanRequest = { ...request };
    if (!cleanRequest.teacherId) {
      delete (cleanRequest as any).teacherId;
    }

    if (this.editingSubject) {
      this.adminService.updateSubject(this.editingSubject.id!, cleanRequest).subscribe({
        next: () => {
          this.subjectsChanged.emit();
          this.editingSubject = undefined;
          this.errorMessage = '';
        },
        error: err => this.handleError(err)
      });
    } else {
      this.adminService.createSubject(cleanRequest).subscribe({
        next: () => {
          this.subjectsChanged.emit();
          this.errorMessage = '';
        },
        error: err => this.handleError(err)
      });
    }
  }

  onDeleteSubject(subject: Subject): void {
    this.adminService.deleteSubject(subject.id!).subscribe({
      next: () => this.subjectsChanged.emit(),
      error: err => this.handleError(err)
    });
  }

  onAssignTeacher(event: {subject: Subject, teacherId: number}): void {
    this.adminService.assignTeacherToSubject(event.subject.id!, event.teacherId).subscribe({
      next: () => this.subjectsChanged.emit(),
      error: err => this.handleError(err)
    });
  }

  onRemoveTeacher(subject: Subject): void {
    this.adminService.removeTeacherFromSubject(subject.id!).subscribe({
      next: () => this.subjectsChanged.emit(),
      error: err => this.handleError(err)
    });
  }

  private handleError(error: any): void {
    this.errorMessage = error?.message || 'An unexpected error occurred';
  }
}
