import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectDetailsComponent } from './pages/projects/projectdetails/projectdetails.component';
import { TaskDetailsComponent } from './pages/tasks/taskdetails/taskdetails.component';
import { UserListComponent } from './pages/userlist/userlist.component';
import { PageNotFoundComponent } from './shared/page-not-found/pagenotfound.component';

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
        loadComponent: () => import('./pages/projects/projectdetails/projectdetails.component').then(m => m.ProjectDetailsComponent)
    },
    {
        path: 'projectlist', title: 'Projects',
        loadComponent: () => import('./pages/projects/projectlist/projectlist.component').then(m => m.ProjectlistComponent)
    },
    {
        path: 'projects/:id', title: 'Project details',
        loadComponent: () => import('./pages/projects/projectdetails/projectdetails.component').then(m => m.ProjectDetailsComponent)
    },
    {
        path: 'register', title: 'Register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'taskdetails', title: 'Task details',
        loadComponent: () => import('./pages/tasks/taskdetails/taskdetails.component').then(m => m.TaskDetailsComponent)
    },
    {
        path: 'tasklist', title: 'Tasks',
        loadComponent: () => import('./pages/tasks/tasklist/tasklist.component').then(m => m.TasklistComponent)
    },
    {
        path: 'tasks/:id', title: 'Task details',
        loadComponent: () => import('./pages/tasks/taskdetails/taskdetails.component').then(m => m.TaskDetailsComponent)
    },
    {
        path: 'userlist', title: 'Users',
        loadComponent: () => import('./pages/userlist/userlist.component').then(m => m.UserListComponent)
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
