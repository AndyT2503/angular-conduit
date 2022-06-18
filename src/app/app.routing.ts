import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: 'settings',
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
