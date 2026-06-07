import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tab-navigation',
  imports: [
    NgClass
  ],
  templateUrl: './tab-navigation.html',
  styleUrl: './tab-navigation.css'
})

export class TabNavigationComponent {
  @Input() activeTab: string = 'subjects';
  @Output() tabChanged = new EventEmitter<'subjects' | 'students' | 'teachers' | 'users'>();

  selectTab(tab: 'subjects' | 'students' | 'teachers' | 'users'): void {
    this.tabChanged.emit(tab);
  }
}
