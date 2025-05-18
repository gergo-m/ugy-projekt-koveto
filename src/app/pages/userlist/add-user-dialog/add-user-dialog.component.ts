import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule
  ],
  template: `
    <h1 mat-dialog-title>Add New User</h1>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>First Name</mat-label>
        <input matInput formControlName="first_name" required>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Last Name</mat-label>
        <input matInput formControlName="last_name" required>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required type="email">
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" required type="password">
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Role</mat-label>
        <mat-select formControlName="role">
          <mat-option value="user">User</mat-option>
          <mat-option value="admin">Admin</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Location</mat-label>
        <input matInput formControlName="location">
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Bio</mat-label>
        <textarea matInput formControlName="bio"></textarea>
      </mat-form-field>
      <div mat-dialog-actions style="justify-content: flex-end;">
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Add</button>
      </div>
    </form>
  `
})
export class AddUserDialogComponent {
  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('user', Validators.required),
    location: new FormControl(''),
    bio: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
