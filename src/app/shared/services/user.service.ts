import { Injectable } from '@angular/core';
import { Firestore, getDoc, getDocs, doc, docData, collection, collectionData, query, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Task, TaskStatus } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  getProfileWithStats(): Observable<{
    user: User | null,
    statistics: {
      projects: { total: number, completed: number, pending: number },
      tasks: { assigned: number, completed: number, pending: number, overdue: number }
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) return of({ user: null, statistics: { projects: { total: 0, completed: 0, pending: 0 }, tasks: { assigned: 0, completed: 0, pending: 0, overdue: 0 } } });
        const userDoc = doc(this.firestore, `users/${authUser.uid}`);
        const user$ = docData(userDoc, { idField: 'id' }) as Observable<User>;
        const projects$ = collectionData(collection(this.firestore, 'projects'), { idField: 'id' }) as Observable<Project[]>;
        const tasksQuery = query(
          collection(this.firestore, 'tasks'),
          where('assignedTo.id', '==', authUser.uid)
        );
        const tasks$ = collectionData(tasksQuery, { idField: 'id' }) as Observable<Task[]>;


        return combineLatest([user$, projects$, tasks$]).pipe(
          map(([user, projects, tasks]) => {
            // Only projects where user is a participant
            const userProjects = projects.filter(p =>
              p.participants.some(participant => participant.id === user.id)
            );
            const totalProjects = userProjects.length;
            const completedProjects = userProjects.filter(p =>
              p.tasks?.length && p.tasks.every(t => t.status === TaskStatus.DONE)
            ).length;
            const pendingProjects = totalProjects - completedProjects;

            // Task stats (already filtered by assignedTo.id)
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(t => t.status === TaskStatus.DONE).length;
            const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.DONE).length;
            const pendingTasks = totalTasks - completedTasks;

            return {
              user,
              statistics: {
                projects: { total: totalProjects, completed: completedProjects, pending: pendingProjects },
                tasks: { assigned: totalTasks, completed: completedTasks, pending: pendingTasks, overdue: overdueTasks }
              }
            };
          })
        );
      })
    );
  }

  getUsers(): Observable<User[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  getCurrentUser(): Observable<User | null> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) return [null];
        const userDoc = doc(this.firestore, `users/${authUser.uid}`);
        return docData(userDoc, { idField: 'id' }) as Observable<User>;
      })
    );
  }

  getUserProfile(): Observable<{
    user: User | null,
    account: {
        created_at: Date,
        last_login: Date,
        role: 'user' | 'admin',
        preferences: {
            theme: "light" | "dark",
            language: "en-US" | "hu-HU",
            notifications: boolean,
        },
    },
    projects: Project[],
    tasks: Task[],
    statistics: {
        projects: {
            total: number,
            completed: number,
            pending: number,
            overdue: number,
        },
        tasks: {
            assigned: number,
            completed: number,
            pending: number,
            overdue: number,
        }
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            account: {
              created_at: new Date(),
              last_login: new Date(),
              role: "user" as "user" | "admin",
              preferences: {
                theme: "dark" as "light" | "dark",
                language: "en-US" as "en-US" | "hu-HU",
                notifications: false
              }
            },
            projects: [],
            tasks: [],
            statistics: {
              projects: { total: 0, completed: 0, pending: 0, overdue: 0 },
              tasks: { assigned: 0, completed: 0, pending: 0, overdue: 0 }
            }
          });
        }

        return from(this.fetchUserWithTasks(authUser.uid));
      })
    );
  }

  private async fetchUserWithTasks(userId: string): Promise<{
    user: User | null,
    account: {
        created_at: Date,
        last_login: Date,
        role: 'user' | 'admin',
        preferences: {
            theme: "light" | "dark",
            language: "en-US" | "hu-HU",
            notifications: boolean,
        },
    },
    projects: Project[],
    tasks: Task[],
    statistics: {
      projects: {
        total: number,
        completed: number,
        pending: number,
        overdue: number,
      },
      tasks: {
        assigned: number,
        completed: number,
        pending: number,
        overdue: number,
      }
    }
  }> {
    try {
      const userDocRef = doc(this.firestore, "users", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return {
          user: null,
          account: {
            created_at: new Date(),
            last_login: new Date(),
            role: 'user',
            preferences: {
                theme: "dark",
                language: "en-US",
                notifications: false,
            },
          },
          projects: [],
          tasks: [],
          statistics: {
            projects: {
              total: 0,
              completed: 0,
              pending: 0,
              overdue: 0,
            },
            tasks: { assigned: 0, completed: 0, pending: 0, overdue: 0 }
          }
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };

      if (!user.tasks || user.tasks.length === 0) {
        return {
          user,
          account: {
            created_at: user.account.created_at,
            last_login: user.account.last_login,
            role: user.account.role,
            preferences: user.account.preferences
          },
          projects: user.projects ?? [],
          tasks: [],
          statistics: {
            projects: user.statistics.projects,
            tasks: { assigned: 0, completed: 0, pending: 0, overdue: 0 }
          }
        };
      }

      const projectsCollection = collection(this.firestore, "projects");
      const projectsQuery = query(projectsCollection, where("id", "in", user.projects));
      const projectsSnapshot = await getDocs(projectsQuery);

      const projects: Project[] = [];
      projectsSnapshot.forEach(doc => {
        projects.push({ ...doc.data(), id: doc.id } as Project);
      });

      const tasksCollection = collection(this.firestore, "tasks");
      const tasksQuery = query(tasksCollection, where("id", "in", user.tasks));
      const tasksSnapshot = await getDocs(tasksQuery);

      const tasks: Task[] = [];
      tasksSnapshot.forEach(doc => {
        tasks.push({ ...doc.data(), id: doc.id } as Task);
      });

      const assigned = tasks.length;
      const completed = tasks.filter(task => task.status === TaskStatus.DONE).length;
      const pending = assigned - completed;
      const overdue = tasks.filter(task => task.dueDate < new Date()).length;

      return {
        user,
        account: {
          created_at: user.account.created_at,
          last_login: user.account.last_login,
          role: user.account.role,
          preferences: user.account.preferences
        },
        projects,
        tasks,
        statistics: {
          projects: user.statistics.projects,
          tasks: { assigned, completed, pending, overdue }
        }
      };
    } catch (error) {
      console.error("Error loading user data: ", error);
      return {
        user: null,
        account: {
          created_at: new Date(),
          last_login: new Date(),
          role: 'user',
          preferences: {
              theme: "dark",
              language: "en-US",
              notifications: false,
          },
        },
        projects: [],
        tasks: [],
        statistics: {
          projects: {
            total: 0,
            completed: 0,
            pending: 0,
            overdue: 0,
          },
          tasks: { assigned: 0, completed: 0, pending: 0, overdue: 0 }
        }
      };
    }
  }
}
