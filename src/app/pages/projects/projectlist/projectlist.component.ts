import { Component, inject } from '@angular/core';
import { Project } from '../../../shared/models/Project';
import { ProjectService } from '../../../shared/services/project.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateFormatterPipe } from "../../../shared/pipes/date.pipe";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';
import { InitialsPipe } from '../../../shared/pipes/initials.pipe';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable, of, combineLatest } from 'rxjs';

@Component({
  selector: 'app-projectlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    DateFormatterPipe,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBarModule,
    InitialsPipe
  ],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.scss'
})
export class ProjectlistComponent {
  authService = inject(AuthService);
  projects: Project[] = [];
  selectedFilter = 'all';
  users: User[] = [];
  currentUser: User | null = null;
  filteredProjects$: Observable<Project[]>;
  userProjects = this.authService.currentUser.pipe(
    switchMap(user =>
      user ? this.projectService.getUserProjects(user.uid) : []
    )
  );

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private projectService: ProjectService
  ) {
    this.userService.getUsers().subscribe(users => this.users = users);
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);

    this.filteredProjects$ = this.userService.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) return of([]);
        return this.projectService.getUserProjects(user.id).pipe(
          map(projects => this.applyStatusFilter(projects, this.selectedFilter))
        );
      })
    );
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  onFilterChange(newFilter: string) {
    this.selectedFilter = newFilter;
    this.filteredProjects$ = this.userService.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) return of([]);
        return this.projectService.getUserProjects(user.id).pipe(
          map(projects => this.applyStatusFilter(projects, this.selectedFilter))
        );
      })
    );
  }

  applyStatusFilter(projects: Project[], filter: string): Project[] {
    const today = new Date();
    return projects.filter(project => {
      const start = new Date(project.start);
      const deadline = new Date(project.deadline);
      switch (filter) {
        case 'upcoming': return start > today && deadline > today;
        case 'ongoing': return start <= today && deadline >= today;
        case 'overdue': return start <= today && deadline < today;
        default: return true;
      }
    });
  }

  getProjectStatus(project: Project): string {
    const today = new Date();
    const startDate = new Date(project.start);
    const deadline = new Date(project.deadline);
    if (today < startDate) return 'upcoming';
    if (today > deadline) return 'overdue';
    return 'ongoing';
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

  getProgress(project: Project): number {
    const start = new Date(project.start).getTime();
    const end = new Date(project.deadline).getTime();
    const now = Date.now();
    if (now < start) return 0;
    if (now > end) return 100;
    const totalDuration = end - start;
    const elapsedDuration = now - start;
    return Math.round((elapsedDuration / totalDuration) * 100);
  }

  getProgressColor(progress: number): string {
    if (progress <= 20) {
      return 'red';
    } else if (progress <= 50) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
  
  openAddProjectDialog(): void {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-panel',
      data: {
        users: this.users,
        currentUser: this.currentUser
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.addProject(result).then(() => {});
      }
    });
  }

  openEditProjectDialog(project: Project, event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      width: '400px',
      data: {
        project,
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

  editProject(project: Project, event: Event): void {
    event.stopPropagation();
    this.openEditProjectDialog(project, event);
  }

  deleteProject(projectId: string, event: Event): void {
    event.stopPropagation();
    this.projectService.deleteProject(projectId).then(() => {});
  }
}
