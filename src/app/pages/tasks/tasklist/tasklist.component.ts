import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Task } from '../../../shared/models/Task';
import { ProfileObject } from '../../../shared/constant';

@Component({
  selector: 'app-tasklist',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss',
  standalone: true
})
export class TasklistComponent implements OnInit {
  ProfileObject = ProfileObject;

  @Input() title: string = 'Tasks';
  @Output() taskAdded = new EventEmitter<Task>();
  
  displayedColumns: string[] = ['status', 'title', 'priority', 'dueDate', 'assignedTo', 'actions'];
  taskForm!: FormGroup;
  
  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular basics tutorial',
      status: 'not_started',
      priority: 'high',
      dueDate: new Date('2025-03-25'),
      assignedTo: ProfileObject[0],
      description: 'Complete the tutorial sections on components and modules'
    },
    {
      id: 2,
      title: 'Practice component creation',
      status: 'in_progress',
      priority: 'medium',
      dueDate: new Date('2025-03-25'),
      assignedTo: ProfileObject[1],
      description: 'Create 3 different components and practice data binding'
    },
    {
      id: 3,
      title: 'Read documentation on directives',
      status: 'done',
      priority: 'lowest',
      dueDate: new Date('2025-03-25'),
      assignedTo: ProfileObject[2],
      description: 'Study structural and attribute directives in Angular'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['medium', Validators.required],
      dueDate: [new Date(), Validators.required],
      assignedTo: [''],
      description: ['', Validators.maxLength(200)]
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: formValue.title,
        status: 'not_started',
        priority: formValue.priority,
        dueDate: formValue.dueDate,
        assignedTo: formValue.assignedTo,
        description: formValue.description
      };
      
      this.tasks = [...this.tasks, newTask];
      this.taskAdded.emit(newTask);
      this.taskForm.reset({
        priority: 'medium',
        dueDate: new Date()
      });
    } else {
      Object.keys(this.taskForm.controls).forEach(key => {
        const control = this.taskForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  toggleTaskCompletion(task: Task): void {
    task.status = 'done';
  }

  trackById(index: number, item: Task): number {
    return item.id;
  }
  
  getFormControlError(controlName: string): string {
    const control = this.taskForm.get(controlName);
    if (control?.invalid) {
      if (control.errors?.['required']) {
        return 'This field is required';
      }
      if (control.errors?.['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors?.['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}