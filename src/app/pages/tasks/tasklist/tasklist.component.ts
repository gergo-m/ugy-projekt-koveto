import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../../shared/models/Project';
import { ProjectObject } from '../../../shared/constant';
import { Task, TaskStatus, TaskPriority } from '../../../shared/models/Task';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DateFormatterPipe } from '../../../shared/pipes/date.pipe';
import { MatTableModule } from '@angular/material/table';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TaskService } from '../../../shared/services/task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';

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
    NgClass,
    AsyncPipe,
    MatButtonModule,
    MatIconButton
  ],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {
  private taskService = inject(TaskService);
  projects = ProjectObject;
  selectedProjectId: number | null = null;
  tasks$: Observable<Task[]> = this.taskService.getTasks();
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

  constructor(private router: Router, taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // No need to subscribe here if using async pipe in template
  }

  onProjectSelect(): void {
    if (this.selectedProjectId !== null) {
      this.tasks$ = this.taskService.getTasks().pipe(
        map(tasks => tasks.filter(task => task.projectId === this.selectedProjectId))
      );
    }
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.NOT_STARTED: return 'status-not-started';
      case TaskStatus.IN_PROGRESS: return 'status-in-progress';
      case TaskStatus.DONE: return 'status-done';
      default: return '';
    }
  }

  getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.LOWEST: return 'priority-lowest';
      case TaskPriority.LOW: return 'priority-low';
      case TaskPriority.MEDIUM: return 'priority-medium';
      case TaskPriority.HIGH: return 'priority-high';
      case TaskPriority.HIGHEST: return 'priority-highest';
      default: return '';
    }
  }

  viewTaskDetails(taskId: number): void {
    this.router.navigate(['/tasks', taskId]);
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-panel'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedProjectId) {
        this.taskService.addTask({
          ...result,
          projectId: this.selectedProjectId,
          comments: []
        }).then(() => {});
      }
    });
  }

openEditTaskDialog(task: Task, event: Event): void {
  event.stopPropagation();
  const dialogRef = this.dialog.open(EditTaskDialogComponent, {
    width: '400px',
    data: task,
      panelClass: 'custom-dialog-panel'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.taskService.updateTask(result).subscribe();
    }
  });
}

deleteTask(taskId: number, event: Event): void {
  event.stopPropagation();
  this.taskService.deleteTask(taskId).then(() => {});
}
}
