import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagenotfound',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pagenotfound.component.html',
  styleUrl: './pagenotfound.component.scss'
})
export class PageNotFoundComponent {}