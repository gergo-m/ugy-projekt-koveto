import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskPriority, TaskStatus } from '../../../../shared/models/Task';
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
          <mat-option *ngFor="let status of statusOptions" [value]="status">{{ status }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Priority</mat-label>
        <mat-select formControlName="priority">
          <mat-option *ngFor="let priority of priorityOptions" [value]="priority">{{ priority }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Due Date</mat-label>
        <input matInput type="date" formControlName="dueDate" required>
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
    dueDate: new FormControl('', Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>) {}

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
