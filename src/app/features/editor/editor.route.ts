import { Route } from '@angular/router';
export const editorRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./new-article/new-article.component').then(
        (c) => c.NewArticleComponent
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./edit-article/edit-article.component').then(
        (c) => c.EditArticleComponent
      ),
  },
];
