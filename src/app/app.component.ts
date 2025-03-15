import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectdetailsComponent } from './pages/projectdetails/projectdetails.component';
import { ProjectlistComponent } from './pages/projectlist/projectlist.component';
import { TaskdetailsComponent } from './pages/taskdetails/taskdetails.component';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { MenuComponent } from './shared/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, LoginComponent, ProfileComponent, ProjectdetailsComponent, ProjectlistComponent, TaskdetailsComponent, TasklistComponent, UserlistComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ugy-projekt-koveto';
}
