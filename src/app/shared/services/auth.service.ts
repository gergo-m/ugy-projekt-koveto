import { Injectable } from '@angular/core';
import { Auth, authState, User as FirebaseUser, UserCredential, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    this.currentUser = authState(this.auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem("isLoggedIn", "false");
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl("/dashboard");
    });
  }

  async register(email: string, password: string, userData: Partial<User>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        account: {
          created_at: new Date(),
          last_login: new Date(),
          role: "user",
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
          tasks: {
              assigned: 0,
              completed: 0,
              pending: 0,
              overdue: 0,
          },
        },
      });

      return userCredential;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(collection(this.firestore, "users"), userId);
    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem("isLoggedIn", isLoggedIn ? 'true' : 'false')
  };
}
