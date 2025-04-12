import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/models/User';

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
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });
  
  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router: Router) {}

  register(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Please correct the form errors before submitting.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      id: -1,
      name: {
        first_name: this.signUpForm.value.name?.first_name || '',
        last_name: this.signUpForm.value.name?.last_name || ''
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      bio: '',
      location: '',
      account: {
        created_at: new Date(),
        last_login: new Date(),
        role: 'user',
        preferences: {
          theme: 'dark',
          language: 'en-US',
          notifications: false
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
    console.log('Form value:', this.signUpForm.value);

    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 2000);
  }
}