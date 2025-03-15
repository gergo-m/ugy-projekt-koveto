import { Component, OnInit } from '@angular/core';
import { ProfileObject } from '../../shared/constant';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  ProfileObject = ProfileObject;
  selectedIndex: number = 0;

  ngOnInit(): void {
    this.selectedIndex = 0;
  }

  reload(index: number): void {
    this.selectedIndex = index;
  }
}
