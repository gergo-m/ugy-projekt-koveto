import { Component } from '@angular/core';
import { Project } from '../../../shared/models/Project';
import { ProjectObject } from '../../../shared/constant';
import { TaskObject } from '../../../shared/constant';
import { Task, TaskStatus, TaskPriority } from '../../../shared/models/Task';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DateFormatterPipe } from '../../../shared/pipes/date.pipe';
import { MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasklist',
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatIconModule,
    DateFormatterPipe,
    NgClass
  ],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent {
  projects = ProjectObject;
  selectedProjectId: number | null = null;
  tasks: Task[] = [];

  statusOptions = Object.values(TaskStatus);
  priorityOptions = Object.values(TaskPriority);
  
  statusMap: Record<TaskStatus, string> = {
    [TaskStatus.NOT_STARTED]: 'Not Started',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.DONE]: 'Done'
  };

  priorityMap: Record<TaskPriority, string> = {
    [TaskPriority.LOWEST]: 'Lowest',
    [TaskPriority.LOW]: 'Low',
    [TaskPriority.MEDIUM]: 'Medium',
    [TaskPriority.HIGH]: 'High',
    [TaskPriority.HIGHEST]: 'Highest'
  };

  constructor(private router: Router) {}

  onProjectSelect(): void {
    if (this.selectedProjectId !== null) {
      this.tasks = TaskObject.filter(task => task.projectId === this.selectedProjectId);
    }
  }

  updateTask(task: Task): void {}

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

  viewTaskDetails(taskId: number): void {
    this.router.navigate(['/tasks', taskId]);
  }  
}
