import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskStatus, TaskPriority } from '../../../shared/models/Task';
import { TaskObject } from '../../../shared/constant';
import { DateFormatterPipe } from '../../../shared/pipes/date.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taskdetails',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    DateFormatterPipe
  ],
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task!: Task;
  statusMap = {
    [TaskStatus.NOT_STARTED]: 'Not Started',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.DONE]: 'Done'
  };

  priorityMap = {
    [TaskPriority.LOWEST]: 'Lowest',
    [TaskPriority.LOW]: 'Low',
    [TaskPriority.MEDIUM]: 'Medium',
    [TaskPriority.HIGH]: 'High',
    [TaskPriority.HIGHEST]: 'Highest'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task = TaskObject.find(t => t.id === taskId)!;
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.NOT_STARTED:
        return 'status-not-started';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.DONE:
        return 'status-done';
      default:
        return '';
    }
  }
  
  getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.LOWEST:
        return 'priority-lowest';
      case TaskPriority.LOW:
        return 'priority-low';
      case TaskPriority.MEDIUM:
        return 'priority-medium';
      case TaskPriority.HIGH:
        return 'priority-high';
      case TaskPriority.HIGHEST:
        return 'priority-highest';
      default:
        return '';
    }
  }
}
