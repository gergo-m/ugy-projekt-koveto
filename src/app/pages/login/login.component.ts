import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  isLoading: boolean = false;
  showForm: boolean = true;
  loginError: string = '';

  constructor(private router: Router) {}

  login(): void {    
    if (this.loginForm.invalid) {
      this.loginError = "Please correct the form errors before submitting.";
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email !== 'test@example.com' || password !== 'testpw123') {
      this.loginError = 'Invalid email or password!';
      return;
    }

    this.isLoading = true;
    this.showForm = false;
    
    localStorage.setItem('isLoggedIn', 'true');
    
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }

  hasErrors(formControl: string) {
    return this.loginForm.get(formControl)?.invalid && this.loginForm.get(formControl)?.touched && !this.loginForm.get(formControl)?.errors?.["required"];
  }

  getErrors(formControl: string) {
    return this.loginForm.get(formControl)?.errors;
  }
}
