import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectDetailsComponent } from './pages/projects/projectdetails/projectdetails.component';
import { TaskDetailsComponent } from './pages/tasks/taskdetails/taskdetails.component';
import { UserListComponent } from './pages/userlist/userlist.component';
import { PageNotFoundComponent } from './shared/page-not-found/pagenotfound.component';
import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard', title: 'Dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'login', title: 'Login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'profile', title: 'Profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'projectdetails', title: 'Project details',
        loadComponent: () => import('./pages/projects/projectdetails/projectdetails.component').then(m => m.ProjectDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'projectlist', title: 'Projects',
        loadComponent: () => import('./pages/projects/projectlist/projectlist.component').then(m => m.ProjectlistComponent),
        canActivate: [authGuard]
    },
    {
        path: 'projects/:id', title: 'Project details',
        loadComponent: () => import('./pages/projects/projectdetails/projectdetails.component').then(m => m.ProjectDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'register', title: 'Register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'taskdetails', title: 'Task details',
        loadComponent: () => import('./pages/tasks/taskdetails/taskdetails.component').then(m => m.TaskDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tasklist', title: 'Tasks',
        loadComponent: () => import('./pages/tasks/tasklist/tasklist.component').then(m => m.TasklistComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tasks/:id', title: 'Task details',
        loadComponent: () => import('./pages/tasks/taskdetails/taskdetails.component').then(m => m.TaskDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'userlist', title: 'Users',
        loadComponent: () => import('./pages/userlist/userlist.component').then(m => m.UserListComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**', title: 'Page Not Found',
        loadComponent: () => import('./shared/page-not-found/pagenotfound.component').then(m => m.PageNotFoundComponent)
    }
];
