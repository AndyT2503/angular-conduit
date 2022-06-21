import { AuthGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { NonAuthGuard } from './core/guards/non-auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    canActivate: [NonAuthGuard],
    loadComponent: () =>
      import('./features/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'register',
    canLoad: [NonAuthGuard],
    loadComponent: () =>
      import('./features/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/setting/setting.component').then(
        (c) => c.SettingComponent
      ),
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('./features/article-detail/article-detail.component').then(
        (x) => x.ArticleDetailComponent
      ),
  },
  {
    path: 'editor',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./features/editor/editor.route').then((m) => m.editorRoutes),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/news-feed/news-feed.component').then(
        (c) => c.NewsFeedComponent
      ),
  },
  {
    path: ':username',
    loadChildren: () =>
      import('./features/profile/profile.route').then(
        (m) => m.profileRoutes
      ),
  },
];
