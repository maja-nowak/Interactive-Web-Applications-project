import {Component, Input} from '@angular/core';
import {Student} from '../../models/student.model';
import {Teacher} from '../../models/teacher.model';
import {Subject} from '../../models/subject.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-stats-card',
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css'
})
export class StatsCardComponent {
  @Input() students: Student[] = [];
  @Input() teachers: Teacher[] = [];
  @Input() subjects: Subject[] = [];
  @Input() users: User[] = [];
}
