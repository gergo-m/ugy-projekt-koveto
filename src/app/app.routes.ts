import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectdetailsComponent } from './pages/projectdetails/projectdetails.component';
import { TaskdetailsComponent } from './pages/taskdetails/taskdetails.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { PageNotFoundComponent } from './shared/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path: 'dashboard', title: 'Dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'login', title: 'Login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'profile', title: 'Profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'projectdetails', title: 'Project details',
        loadComponent: () => import('./pages/projectdetails/projectdetails.component').then(m => m.ProjectdetailsComponent)
    },
    {
        path: 'projectlist', title: 'Projects',
        loadComponent: () => import('./pages/projectlist/projectlist.component').then(m => m.ProjectlistComponent)
    },
    {
        path: 'register', title: 'Register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'taskdetails', title: 'Task details',
        loadComponent: () => import('./pages/taskdetails/taskdetails.component').then(m => m.TaskdetailsComponent)
    },
    {
        path: 'tasklist', title: 'Tasks',
        loadComponent: () => import('./pages/tasklist/tasklist.component').then(m => m.TasklistComponent)
    },
    {
        path: 'userlist', title: 'Users',
        loadComponent: () => import('./pages/userlist/userlist.component').then(m => m.UserlistComponent)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**', title: 'Page Not Found',
        loadComponent: () => import('./shared/pagenotfound/pagenotfound.component').then(m => m.PageNotFoundComponent)
    }
];
