import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../shared/models/User';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)])
    }),
    bio: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]),
    location: new FormControl('Szeged, Hungary', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required]),
    preferences: new FormGroup({
      theme: new FormControl('dark', [Validators.required]),
      language: new FormControl('en-US', [Validators.required]),
      notifications: new FormControl(false)
    })
  });
  
  isLoading: boolean = false;
  showForm: boolean = true;
  registerError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  register(): void {
    if (this.registerForm.invalid) {
      this.registerError = 'Please correct the form errors before submitting.';
      return;
    }

    const password = this.registerForm.get('password')?.value;
    const rePassword = this.registerForm.get('rePassword')?.value;

    if (password !== rePassword) {
      this.registerError = "Passwords do not match.";
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<User> = {
      name: {
        first_name: this.registerForm.value.name?.first_name || '',
        last_name: this.registerForm.value.name?.last_name || ''
      },
      email: this.registerForm.value.email || '',
      bio: this.registerForm.value.bio || '',
      location: this.registerForm.value.location || '',
      account: {
        created_at: new Date(),
        last_login: new Date(),
        role: "user",
        preferences: {
          theme: "dark",
          language: "en-US",
          notifications: false
        }
      },
      projects: [],
      tasks: []
    };

    const email = this.registerForm.value.email || '';
    const pw = this.registerForm.value.password || '';

    this.authService.register(email, pw, userData)
    .then(userCredential => {
      console.log("Registration successful:", userCredential.user);
      this.authService.updateLoginStatus(true);
      this.router.navigateByUrl("/dashboard");
    })
    .catch(error => {
      console.error("Registration error:", error);
      this.isLoading = false;
      this.showForm = true;

      switch (error.code) {
        case "auth/email-already-in-use":
          this.registerError = "This email is already in use.";
          break;
        case "auth/invalid-email":
          this.registerError = "Invalid email.";
          break;
        case "auth/weak-passwprd":
          this.registerError = "The password is too weak. Use at least 6 characters.";
          break;
        default:
          this.registerError = "An error occused during registration. Please try again later.";
      }
    })
  }

  hasErrors(formControl: string) {
    return this.registerForm.get(formControl)?.invalid && this.registerForm.get(formControl)?.touched && !this.registerForm.get(formControl)?.errors?.["required"];
  }

  getErrors(formControl: string) {
    return this.registerForm.get(formControl)?.errors;
  }

  checkPasswordMatch() {
    const password = this.registerForm.get('password')?.value;
    const rePassword = this.registerForm.get('rePassword')?.value;
    return password === rePassword;
  }

  updateBodyBackground(): void {
    const theme = this.registerForm.get('preferences.theme')?.value;
  
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme === 'dark' ? 'dark-theme' : 'light-theme');
  }
}