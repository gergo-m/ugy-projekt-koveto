import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../../shared/models/User';

@Component({
  selector: 'app-add-project-dialog',
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
    <h1 mat-dialog-title>Add New Project</h1>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="status-preview" *ngIf="form.value.start && form.value.deadline && !deadlineInvalid">
        <span class="status-badge status-{{status.toLowerCase()}}">
          {{ status }}
        </span>
      </div>
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
        <!--<mat-error *ngIf="form.errors?.invalidDateRange">
          Deadline cannot be before start date.
        </mat-error>-->
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
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid" id="add-project-btn">Add</button>
      </div>
    </form>
  `
})
export class AddProjectDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { users: User[], currentUser: User }
  ) {
    const initialParticipants = data.users.filter(u => u.id === data.currentUser.id);
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      start: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      participants: new FormControl(
        initialParticipants,
        Validators.required
      )
    }, { validators: dateRangeValidator });
  }

  isCurrentUser(user: User): boolean {
    return this.data.currentUser && user.id === this.data.currentUser.id;
  }

  get status(): string {
    const start = new Date(this.form.value.start);
    const deadline = new Date(this.form.value.deadline);
    const today = new Date();
    if (!this.form.value.start || !this.form.value.deadline) return '';
    if (today < start) return 'Upcoming';
    if (today > deadline) return 'Overdue';
    return 'Ongoing';
  }

  get deadlineInvalid(): boolean {
    const start = new Date(this.form.value.start);
    const deadline = new Date(this.form.value.deadline);
    return this.form.value.start && this.form.value.deadline && deadline < start;
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
        ...this.form.value,
        participants,
        participantIds
      });
    }
  }
}

export const dateRangeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const start = group.get('start')?.value;
  const deadline = group.get('deadline')?.value;
  if (start && deadline && new Date(deadline) < new Date(start)) {
    return { invalidDateRange: true };
  }
  return null;
};
