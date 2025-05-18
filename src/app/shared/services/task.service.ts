import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private collectionName = 'tasks';

  constructor(private firestore: Firestore) {}

  getTasks(): Observable<Task[]> {
    const tasksRef = collection(this.firestore, this.collectionName);
    return collectionData(tasksRef, { idField: 'id' }) as Observable<Task[]>;
  }

  getTasksByProjectId(projectId: string): Observable<Task[]> {
    const tasksRef = collection(this.firestore, this.collectionName);
    const tasksQuery = query(tasksRef, where('projectId', '==', projectId));
    return collectionData(tasksQuery, { idField: 'id' }) as Observable<Task[]>;
  }

  getTaskById(id: string): Observable<Task | undefined> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(taskDoc, { idField: 'id' }) as Observable<Task | undefined>;
  }

  addTask(task: Omit<Task, 'id'>): Promise<any> {
    const tasksRef = collection(this.firestore, this.collectionName);
    return addDoc(tasksRef, task);
  }

  updateTask(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${task.id}`);
    const { id, ...taskData } = task;
    return updateDoc(taskDoc, taskData);
  }

  deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(taskDoc);
  }
}
