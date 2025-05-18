import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects: Project[] = [];
  private projectsSubject = new BehaviorSubject<Project[]>(this.projects);

  getProjects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  getProjectsPromise(): Promise<Project[]> {
    return Promise.resolve(this.projects);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    return new BehaviorSubject(this.projects.find(p => p.id === id)).asObservable();
  }

  addProject(project: Project): Promise<Project> {
    project.id = Date.now();
    this.projects.push(project);
    this.projectsSubject.next(this.projects);
    return Promise.resolve(project);
  }

  updateProject(updatedProject: Project): Observable<Project> {
    const idx = this.projects.findIndex(p => p.id === updatedProject.id);
    if (idx !== -1) {
      this.projects[idx] = updatedProject;
      this.projectsSubject.next(this.projects);
    }
    return new BehaviorSubject(updatedProject).asObservable();
  }

  deleteProject(id: number): Promise<void> {
    this.projects = this.projects.filter(p => p.id !== id);
    this.projectsSubject.next(this.projects);
    return Promise.resolve();
  }
}
