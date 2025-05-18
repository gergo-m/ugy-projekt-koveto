import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  isLoading: boolean = false;
  showForm: boolean = true;
  loginError: string = '';
  authSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {    
    if (this.loginForm.invalid) {
      this.loginError = "Please correct the form errors before submitting.";
      return;
    }

    const email = this.loginForm.get('email')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.isLoading = true;
    this.showForm = false;
    
    this.authService.signIn(email, password)
      .then(userCredential => {
        console.log("Login successful:", userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl("/dashboard");
      })
      .catch(error => {
        console.error("Login error:", error);
        this.isLoading = false;
        this.showForm = true;

        switch(error.code) {
          case "auth/user-not-found":
            this.loginError = "No account found with that email";
            break;
          case "auth/wrong-password":
            this.loginError = "Incorrect password";
            break;
          case "auth/invalid-credential":
            this.loginError = "Invalid email or password";
            break;
          default:
            this.loginError = "Authentication failed. Please try again later.";
        }
      });
  }

  ngOnDestroy(): void {
      this.authSubscription?.unsubscribe();
  }

  hasErrors(formControl: string) {
    return this.loginForm.get(formControl)?.invalid && this.loginForm.get(formControl)?.touched && !this.loginForm.get(formControl)?.errors?.["required"];
  }

  getErrors(formControl: string) {
    return this.loginForm.get(formControl)?.errors;
  }
}
