import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTasksPromise(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  getTaskById(id: number): Observable<Task | undefined> {
    return new BehaviorSubject(this.tasks.find(t => t.id === id)).asObservable();
  }

  addTask(task: Task): Promise<Task> {
    task.id = Date.now();
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    return Promise.resolve(task);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const idx = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (idx !== -1) {
      this.tasks[idx] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
    return new BehaviorSubject(updatedTask).asObservable();
  }

  deleteTask(id: number): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);
    return Promise.resolve();
  }
}
