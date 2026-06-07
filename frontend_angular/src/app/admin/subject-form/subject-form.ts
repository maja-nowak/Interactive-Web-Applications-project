import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { Subject } from '../../models/subject.model';
import { Teacher } from '../../models/teacher.model';
import { SubjectRequest } from '../../services/admin.service';

@Component({
  selector: 'app-subject-form',
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './subject-form.html',
  styleUrl: './subject-form.css'
})
export class SubjectFormComponent implements OnInit {
  @Input() editingSubject?: Subject;
  @Input() teachers: Teacher[] = [];
  @Input() errorMessage: string = '';
  @Output() save = new EventEmitter<SubjectRequest>();
  @Output() cancel = new EventEmitter<void>();
  @Output() createNew = new EventEmitter<void>();

  subjectForm: SubjectRequest = { name: '', description: '' };

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  private resetForm(): void {
    if (this.editingSubject) {
      this.subjectForm = {
        name: this.editingSubject.name || '',
        description: this.editingSubject.description || '',
        teacherId: this.editingSubject.teacher?.id || 0,
      };
    } else {
      this.subjectForm = { name: '', description: '', teacherId: 0 };
    }
  }

  onSave(): void {
    if (!this.subjectForm.name.trim()) {
      alert("Provide subject name")
      return;
    }
    this.save.emit({ ...this.subjectForm });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

