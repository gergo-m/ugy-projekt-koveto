import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  priority: "Highest" | "High" | "Medium" | "Low" | "Lowest";
  dueDate: string;
}

@Component({
  selector: 'app-tasklist',
  imports: [FormsModule, CommonModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss',
  standalone: true
})
export class TasklistComponent implements OnInit {
  @Input() title: string = "Project Tasks";
  @Output() taskAdded = new EventEmitter<Task>();

  newTaskName: string = "";
  newTaskPriority: "Highest" | "High" | "Medium" | "Low" | "Lowest" = "Medium";

  tasks: Task[] = [
    {
      id: 1,
      name: "Complete Angular basics tutorial",
      completed: false,
      priority: "High",
      dueDate: new Date().toISOString()
    },
    {
      id: 2,
      name: "Practice component creation",
      completed: false,
      priority: "Medium",
      dueDate: new Date().toISOString()
    },
    {
      id: 3,
      name: "Read documentation on directives",
      completed: false,
      priority: "Lowest",
      dueDate: new Date().toISOString()
    },
    {
      id: 4,
      name: "Task blabla",
      completed: false,
      priority: "Highest",
      dueDate: new Date().toISOString()
    },
    {
      id: 5,
      name: "Not that important tbh",
      completed: false,
      priority: "Low",
      dueDate: new Date().toISOString()
    }
  ];

  ngOnInit(): void {
    this.tasks = this.tasks.map(task => {
      const date = new Date();
      date.setDate(date.getDate() + 2);
      return {
        ...task,
        dueDate: date.toISOString()
      };
    });
  }

  addTask(): void {
    if (this.newTaskName.trim()) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 2);

      const newTask: Task = {
        id: this.tasks.length + 1,
        name: this.newTaskName.trim(),
        completed: false,
        priority: this.newTaskPriority,
        dueDate: dueDate.toISOString()
      }

      this.tasks.push(newTask);
      this.taskAdded.emit(newTask);
      this.newTaskName = "";
    }
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
  }

  trackById(index: number, item: Task): number {
    return item.id;
  }
}
