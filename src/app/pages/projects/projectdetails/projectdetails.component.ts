import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../shared/models/Project';
import { ProjectObject } from '../../../shared/constant';
import { DateFormatterPipe } from '../../../shared/pipes/date.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projectdetails',
  standalone: true,
  imports: [
    DateFormatterPipe,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.project = ProjectObject.find(p => p.id === projectId)!;
  }

  back(): void {
    this.location.back(); // Navigate to the previous page
  }

  getProgress(): number {
    const start = new Date(this.project.start).getTime();
    const end = new Date(this.project.deadline).getTime();
    const now = Date.now();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }

  getProjectStatus(): string {
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
}
