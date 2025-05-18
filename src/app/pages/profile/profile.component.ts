import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';

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
  private userService = inject(UserService);

  profile$ = this.userService.getProfileWithStats();

  ngOnInit(): void {}

  getFullName(user: User): string {
    return `${user.name.first_name} ${user.name.last_name}`;
  }

  getCompletionRate(tasksStats: { assigned: number, completed: number }): string {
    if (!tasksStats || tasksStats.assigned === 0) {
      return '0.00';
    }
    return ((tasksStats.completed / tasksStats.assigned) * 100).toFixed(2);
  }
}
