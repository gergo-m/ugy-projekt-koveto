import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileObject } from '../../shared/constant';
import { User } from '../../shared/models/User';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  ProfileObject: User[] = ProfileObject;
  selectedIndex: number = 0;

  getFullName(): string {
    const user = this.ProfileObject[this.selectedIndex];
    return `${user.name.first_name} ${user.name.last_name}`;
  }

  getUserRole(): string {
    return this.ProfileObject[this.selectedIndex].account.role;
  }

  getCompletionRate(): string {
    const tasks = this.ProfileObject[this.selectedIndex].statistics.tasks;
    if (tasks.assigned === 0) {
      return '0.00';
    }
    return ((tasks.completed / tasks.assigned) * 100).toFixed(2);
  }

  ngOnInit(): void {
    this.selectedIndex = 0;
  }

  reload(index: number): void {
    this.selectedIndex = index;
  }
}