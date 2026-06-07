import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Student } from '../../models/student.model';
import { Teacher } from '../../models/teacher.model';
import { Subject } from '../../models/subject.model';

@Component({
  selector: 'app-user-list',
  imports: [NgForOf, NgIf],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent {
  @Input() users: (Student | Teacher)[] = [];
  @Input() subjects: Subject[] = [];
  @Input() userType: 'Student' | 'Teacher' = 'Student';
  @Input() title: string = 'User Management';

  get showSubjects(): boolean {
    return this.userType === 'Teacher';
  }

  getUserSubjects(userId: number): Subject[] {
    if (!this.showSubjects) return [];
    return this.subjects.filter(subject => subject.teacher?.id === userId);
  }
}
