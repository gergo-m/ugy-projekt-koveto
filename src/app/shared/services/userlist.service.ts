import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class UserListService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>(this.users);

  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  getUsersPromise(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
/*
  getUserById(id: number): Observable<User | undefined> {
    return new BehaviorSubject(this.users.find(u => u.id === id)).asObservable();
  }

  addUser(user: User): Promise<User> {
    user.id = Date.now();
    this.users.push(user);
    this.usersSubject.next(this.users);
    return Promise.resolve(user);
  }

  updateUser(updatedUser: User): Observable<User> {
    const idx = this.users.findIndex(u => u.id === updatedUser.id);
    if (idx !== -1) {
      this.users[idx] = updatedUser;
      this.usersSubject.next(this.users);
    }
    return new BehaviorSubject(updatedUser).asObservable();
  }

  deleteUser(id: number): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
    this.usersSubject.next(this.users);
    return Promise.resolve();
  }
    */
}
