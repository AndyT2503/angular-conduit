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
    path: '',
    loadComponent: () =>
      import('./app/features/news-feed/news-feed.component').then(
        (c) => c.NewsFeedComponent
      ),
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('./app/features/article/article.component').then(
        (x) => x.ArticleComponent
      ),
  },
];
