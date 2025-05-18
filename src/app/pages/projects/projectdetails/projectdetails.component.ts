import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../shared/models/Project';
import { ProjectService } from '../../../shared/services/project.service';
import { DateFormatterPipe } from '../../../shared/pipes/date.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectDialogComponent } from '../projectlist/edit-project-dialog/edit-project-dialog.component';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';

@Component({
  selector: 'app-projectdetails',
  standalone: true,
  imports: [
    DateFormatterPipe,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    InitialsPipe
  ],
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project | undefined;
  users: User[] = [];
  currentUser: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.projectService.getProjectById(projectId || '').subscribe(project => {
      this.project = project;
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  getProgress(): number {
    if (!this.project) return 0;
    const start = new Date(this.project.start).getTime();
    const end = new Date(this.project.deadline).getTime();
    const now = Date.now();
    if (now < start) return 0;
    if (now > end) return 100;
    return Math.round(((now - start) / (end - start)) * 100);
  }

  getProjectStatus(): string {
    if (!this.project) return '';
    const today = new Date();
    const start = new Date(this.project.start);
    const end = new Date(this.project.deadline);
    if (today < start) return 'Upcoming';
    if (today > end) return 'Overdue';
    return 'Ongoing';
  }

  getDaysUntil(start: Date): number {
    const diff = new Date(start).getTime() - Date.now();
    const days = Math.floor(Math.abs(diff) / (1000 * 3600 * 24));
    return days;
  }

  getDaysRemaining(deadline: Date): number {
    const diff = new Date(deadline).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  openEditProjectDialog(event: Event): void {
    event.stopPropagation();
    if (!this.project) return;
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      width: '400px',
      data: {
        project: this.project,
        users: this.users,
        currentUser: this.currentUser
      },
      panelClass: 'custom-dialog-panel'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.updateProject(result).then(() => {});
      }
    });
  }

  deleteProject(event: Event): void {
    event.stopPropagation();
    if (!this.project) return;
    this.projectService.deleteProject(this.project.id).then(() => {
      this.router.navigate(['/projects']);
    });
  }
}
