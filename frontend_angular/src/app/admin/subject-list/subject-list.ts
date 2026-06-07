import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Subject } from '../../models/subject.model';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-subject-list',
  imports: [NgForOf, NgIf],
  templateUrl: './subject-list.html',
  styleUrl: './subject-list.css'
})

export class SubjectListComponent {
  @Input() subjects: Subject[] = [];
  @Input() teachers: Teacher[] = [];
  @Output() edit = new EventEmitter<Subject>();
  @Output() delete = new EventEmitter<Subject>();
  @Output() assignTeacher = new EventEmitter<{subject: Subject, teacherId: number}>();
  @Output() removeTeacher = new EventEmitter<Subject>();

  onEdit(subject: Subject): void {
    this.edit.emit(subject);
  }

  onDelete(subject: Subject): void {
    if (confirm(`Are you sure you want to delete subject "${subject.name}"?`)) {
      this.delete.emit(subject);
    }
  }

  onAssignTeacher(subject: Subject, teacherId: number): void {
    if (!teacherId) {
      alert('Please select a valid teacher');
      return;
    }
    this.assignTeacher.emit({ subject, teacherId });
  }

  onRemoveTeacher(subject: Subject): void {
    this.removeTeacher.emit(subject);
  }
}
