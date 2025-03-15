import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from "../../shared/pipes/date.pipe";

@Component({
  selector: 'app-projectlist',
  standalone: true,
  imports: [CommonModule, FormsModule, DateFormatterPipe],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.scss'
})
export class ProjectlistComponent {
  // ngModel variables
  filterText: string = '';
  fontSize: number = 14;

  // ngClass variables
  selectedTheme: 'light' | 'dark' | 'colorful' = 'light';

  completedTasks = [
    {
      name: 'Set up development environment',
      date: '2025-03-01T14:30:00Z',  // ISO format with time and timezone
      time: '2 hours'
    },
    {
      name: 'Install Angular CLI',
      date: '2025-02-28T09:15:42Z',
      time: '30 minutes'
    }
  ];
}
