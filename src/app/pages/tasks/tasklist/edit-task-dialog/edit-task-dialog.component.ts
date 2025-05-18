import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task, TaskPriority, TaskStatus } from '../../../../shared/models/Task';
import { User } from '../../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule
  ],
  template: `
    <h1 mat-dialog-title>Edit Task</h1>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Task Title</mat-label>
        <input matInput formControlName="title" required>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description"></textarea>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Status</mat-label>
        <mat-select formControlName="status">
          @for (status of statusOptions; track status) {
            <mat-option [value]="status">{{ status }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Priority</mat-label>
        <mat-select formControlName="priority">
          @for (priority of priorityOptions; track priority) {
            <mat-option [value]="priority">{{ priority }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Due Date</mat-label>
        <input matInput type="date" formControlName="dueDate" required>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Assigned To</mat-label>
        <mat-select formControlName="assignedTo" required>
          @for (user of data.participants; track user.id) {
            <mat-option [value]="user">
              {{ user.name.first_name }} {{ user.name.last_name }}
            </mat-option>
          }
        </mat-select>
      </mat-form-field>
      <div mat-dialog-actions style="justify-content: flex-end;">
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Save</button>
      </div>
    </form>
  `
})
export class EditTaskDialogComponent {
  statusOptions = Object.values(TaskStatus);
  priorityOptions = Object.values(TaskPriority);

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, participants: User[] }
  ) {
    this.form = new FormGroup({
      title: new FormControl(data.task.title, Validators.required),
      description: new FormControl(data.task.description),
      status: new FormControl(data.task.status, Validators.required),
      priority: new FormControl(data.task.priority, Validators.required),
      dueDate: new FormControl(this.formatDate(data.task.dueDate), Validators.required),
      assignedTo: new FormControl(data.task.assignedTo, Validators.required)
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.data.task,
        ...this.form.value
      });
    }
  }
}
