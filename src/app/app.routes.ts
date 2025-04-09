import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectdetailsComponent } from './pages/projectdetails/projectdetails.component';
import { TaskdetailsComponent } from './pages/taskdetails/taskdetails.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
    { path: 'login', title: 'Login', component: LoginComponent},
    { path: 'profile', title: 'Profile', component: ProfileComponent},
    { path: 'projectdetails', title: 'Project details', component: ProjectdetailsComponent},
    // lazy loading:
    {
        path: 'projectlist', title: 'Projects',
        loadComponent: () => import('./pages/projectlist/projectlist.component').then(m => m.ProjectlistComponent)
    },
    { path: 'taskdetails', title: 'Task details', component: TaskdetailsComponent},
    {
        path: 'tasklist', title: 'Tasks',
        loadComponent: () => import('./pages/tasklist/tasklist.component').then(m => m.TasklistComponent)
    },
    { path: 'userlist', title: 'Users', component: UserlistComponent},
    { path: '**', title: 'Page Not Found', component: PagenotfoundComponent }
];
