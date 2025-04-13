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

  constructor(private router: Router) {}

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

    const newUser: User = {
      id: -1,
      name: {
        first_name: this.registerForm.value.name?.first_name || '',
        last_name: this.registerForm.value.name?.last_name || ''
      },
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      bio: this.registerForm.value.bio || '',
      location: this.registerForm.value.location || '',
      account: {
        created_at: new Date(),
        last_login: new Date(),
        role: 'user',
        preferences: {
          theme: this.registerForm.value.preferences?.theme as "light" | "dark",
          language: this.registerForm.value.preferences?.language as "en-US" | "hu-HU",
          notifications: !!this.registerForm.value.preferences?.notifications
        }
      },
      statistics: {
        projects: {
          total: 0,
          completed: 0,
          pending: 0
        },
        tasks: {
          assigned: 0,
          completed: 0,
          pending: 0,
          overdue: 0
        }
      }
    };

    console.log('New user:', newUser);
    console.log('Form value:', this.registerForm.value);

    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 2000);
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
}