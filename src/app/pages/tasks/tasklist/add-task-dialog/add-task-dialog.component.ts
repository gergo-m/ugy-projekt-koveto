import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../../../shared/models/Task';
import { User } from '../../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-task-dialog',
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
    <h1 mat-dialog-title>Add New Task</h1>
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
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Add</button>
      </div>
    </form>
  `
})
export class AddTaskDialogComponent {
  statusOptions = Object.values(TaskStatus);
  priorityOptions = Object.values(TaskPriority);

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    status: new FormControl(TaskStatus.NOT_STARTED, Validators.required),
    priority: new FormControl(TaskPriority.MEDIUM, Validators.required),
    dueDate: new FormControl('', Validators.required),
    assignedTo: new FormControl<User | null>(null, Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { participants: User[] }
  ) {}

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
