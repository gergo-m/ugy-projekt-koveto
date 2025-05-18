import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../shared/models/Project';
import { User } from '../../../../shared/models/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h1 mat-dialog-title>Edit Project</h1>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Project Name</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description"></textarea>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Start Date</mat-label>
        <input matInput type="date" formControlName="start" required>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Deadline</mat-label>
        <input matInput type="date" formControlName="deadline" required>
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Participants</mat-label>
        <mat-select formControlName="participants" multiple>
          @for (user of data.users; track user.id) {
            <mat-option [value]="user" [disabled]="isCurrentUser(user)">
              {{ user.name.first_name }} {{ user.name.last_name }}
              <span *ngIf="isCurrentUser(user)"> (You)</span>
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
export class EditProjectDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project, users: User[], currentUser: User }
  ) {
    let participants = data.project.participants || [];
    if (!participants.find(u => u.id === data.currentUser.id)) {
      participants = [data.currentUser, ...participants];
    }
    const initialParticipants = data.users.filter(user => data.project.participants.some(p => p.id === user.id));
    if (!initialParticipants.find(u => u.id === data.currentUser.id)) {
      initialParticipants.unshift(data.currentUser);
    }
    this.form = new FormGroup({
      name: new FormControl(data.project.name, Validators.required),
      description: new FormControl(data.project.description),
      start: new FormControl(this.formatDate(data.project.start), Validators.required),
      deadline: new FormControl(this.formatDate(data.project.deadline), Validators.required),
      participants: new FormControl(initialParticipants, Validators.required)
    });
  }

  isCurrentUser(user: User): boolean {
    return this.data.currentUser && user.id === this.data.currentUser.id;
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  submit() {
    if (this.form.valid) {
      let participants: User[] = this.form.value.participants || [];
      let participantIds: string[] = participants.map(u => u.id);
      if (!participants.find(u => u.id === this.data.currentUser.id)) {
        participants = [this.data.currentUser, ...participants];
        participantIds = [this.data.currentUser.id, ...participantIds];
      }
      this.dialogRef.close({
        ...this.data.project,
        ...this.form.value,
        participants,
        participantIds
      });
    }
  }
}
