import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./app/features/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./app/features/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./app/features/setting/setting.component').then(
        (c) => c.SettingComponent
      ),
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('./app/features/article-detail/article-detail.component').then(
        (x) => x.ArticleDetailComponent
      ),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./app/features/editor/editor.route').then((m) => m.editorRoutes),
  },
  {
    path: '',
    loadComponent: () =>
      import('./app/features/news-feed/news-feed.component').then(
        (c) => c.NewsFeedComponent
      ),
  },
  {
    path: ':username',
    loadChildren: () =>
      import('./app/features/profile/profile.route').then(
        (m) => m.profileRoutes
      ),
  },
];
