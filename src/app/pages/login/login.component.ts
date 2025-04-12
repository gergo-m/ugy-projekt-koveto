import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
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
  email = new FormControl('');
  password = new FormControl('');
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private router: Router) {}

  login() {
    this.loginError = '';
    
    if (this.email.value === 'test@gmail.com' && this.password.value === 'testpw') {
      console.log('Login function called!');
      this.isLoading = true;
      this.showLoginForm = false;
      
      localStorage.setItem('isLoggedIn', 'true');
      
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 3000);
    } else {
      this.loginError = 'Invalid email or password!';
    }
  }
}
