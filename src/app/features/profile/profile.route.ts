import { ProfileRepository } from './state/profile.repository';
import { ArticleType, providerArticleType } from './components/article-list/article-list.di';
import { Route } from '@angular/router';

export const profileRoutes: Route[] = [
  {
    path: '',
    providers: [ProfileRepository],
    loadComponent: () =>
      import('./profile.component').then((c) => c.ProfileComponent),
    children: [
      {
        path: '',
        providers: providerArticleType(ArticleType.MyArticle),
        loadComponent: () =>
          import('./components/article-list/article-list.component').then(
            (c) => c.ArticleListComponent
          ),
      },
      {
        path: 'favorites',
        providers: providerArticleType(ArticleType.FavoritedArticle),
        loadComponent: () =>
          import('./components/article-list/article-list.component').then(
            (c) => c.ArticleListComponent
          ),
      },
    ],
  },
];
