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
import { NgIf } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, LoginComponent, ProfileComponent, ProjectdetailsComponent, ProjectlistComponent, TaskdetailsComponent, TasklistComponent, UserlistComponent, MenuComponent, NgIf, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ugy-projekt-koveto';

  page = "dashboard";

  changePage(selectedPage: string) {
    this.page = selectedPage;
  }

  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
