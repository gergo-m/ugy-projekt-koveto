import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-user-dialog',
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
    <h1 mat-dialog-title>Edit User</h1>
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
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Save</button>
      </div>
    </form>
  `
})
export class EditUserDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.form = new FormGroup({
      first_name: new FormControl(data.name.first_name, Validators.required),
      last_name: new FormControl(data.name.last_name, Validators.required),
      email: new FormControl(data.email, [Validators.required, Validators.email]),
      role: new FormControl(data.account.role, Validators.required),
      location: new FormControl(data.location),
      bio: new FormControl(data.bio)
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.data,
        name: {
          first_name: this.form.value.first_name,
          last_name: this.form.value.last_name
        },
        email: this.form.value.email,
        account: {
          ...this.data.account,
          role: this.form.value.role
        },
        location: this.form.value.location,
        bio: this.form.value.bio
      });
    }
  }
}
