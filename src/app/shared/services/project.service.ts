import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, where, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../models/Project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private collectionName = 'projects';

  constructor(private firestore: Firestore) {}

  getProjects(): Observable<Project[]> {
    const projectsRef = collection(this.firestore, this.collectionName);
    return collectionData(projectsRef, { idField: 'id' }) as Observable<Project[]>;
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const projectDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(projectDoc, { idField: 'id' }) as Observable<Project | undefined>;
  }

  getUserProjects(userId: string): Observable<Project[]> {
    const projectsRef = collection(this.firestore, this.collectionName);
    const userProjectsQuery = query(
      projectsRef,
      where('participantIds', 'array-contains', userId)
    );
    return collectionData(userProjectsQuery, { idField: 'id' }) as Observable<Project[]>;
  }

  addProject(project: Omit<Project, 'id'>): Promise<any> {
    const projectsRef = collection(this.firestore, this.collectionName);
    return addDoc(projectsRef, project);
  }

  updateProject(project: Project): Promise<void> {
    const projectDoc = doc(this.firestore, `${this.collectionName}/${project.id}`);
    const { id, ...projectData } = project;
    return updateDoc(projectDoc, projectData);
  }

  deleteProject(id: string): Promise<void> {
    const projectDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(projectDoc);
  }
}
