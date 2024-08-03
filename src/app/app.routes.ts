import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./posts/post-list/post-list.component').then(m => m.PostListComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./posts/post-create/post-create.component').then(m => m.PostCreateComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'edit/:postId',
        loadComponent: () => import('./posts/post-create/post-create.component').then(m => m.PostCreateComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth/login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'auth/signup',
        loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent),
    }
];
