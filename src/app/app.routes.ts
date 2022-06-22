import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NonAuthGuard } from './core/guards/non-auth.guard';
import { editorSeo, homeSeo, signInSeo, signUpSeo } from './core/seo';

export const appRoutes: Routes = [
  {
    path: 'login',
    canActivate: [NonAuthGuard],
    loadComponent: () =>
      import('./features/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
    data: signInSeo,
  },
  {
    path: 'register',
    canLoad: [NonAuthGuard],
    loadComponent: () =>
      import('./features/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
    data: signUpSeo,
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
    data: editorSeo,
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/news-feed/news-feed.component').then(
        (c) => c.NewsFeedComponent
      ),
    data: homeSeo,
  },
  {
    path: ':username',
    loadChildren: () =>
      import('./features/profile/profile.route').then((m) => m.profileRoutes),
  },
];
