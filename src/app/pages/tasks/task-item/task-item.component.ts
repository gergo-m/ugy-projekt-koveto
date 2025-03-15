import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../tasklist/tasklist.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  standalone: true
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() complete = new EventEmitter<Task>();

  toggleComplete(): void {
    this.complete.emit(this.task);
  }
}
