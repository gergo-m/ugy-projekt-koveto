import { Component, OnInit, inject } from '@angular/core';
// import { UserService } from '../../shared/services/userlist.service';
import { User } from '../../shared/models/User';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    AsyncPipe,
    MatTableModule,
    MatButtonModule
  ]
})
export class UserListComponent /* implements OnInit */ {
  /*
  private userService = inject(UserService);
  users$: Observable<User[]> = this.userService.getUsers();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-panel'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newUser: User = {
          id: 0,
          name: { first_name: result.first_name, last_name: result.last_name },
          email: result.email,
          password: result.password,
          bio: result.bio,
          location: result.location,
          account: {
            created_at: new Date(),
            last_login: new Date(),
            role: result.role,
            preferences: { theme: 'light', language: 'en-US', notifications: true }
          },
          statistics: {
            projects: { total: 0, completed: 0, pending: 0 },
            tasks: { assigned: 0, completed: 0, pending: 0, overdue: 0 }
          }
        };
        this.userService.addUser(newUser).then(() => {});
      }
    });
    
  }

  
  openEditUserDialog(user: User, event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: user,
      panelClass: 'custom-dialog-panel'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe();
      }
    });
  }

  deleteUser(userId: number, event: Event): void {
    event.stopPropagation();
    this.userService.deleteUser(userId).then(() => {});
  }
    */
}
