import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { ArticleRepository } from 'src/app/core/state';

@Injectable({
  providedIn: 'root',
})
export class ArticleDetailTitleResolverService implements Resolve<string> {
  private readonly articleRepository = inject(ArticleRepository);
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): string | Observable<string> | Promise<string> {
    return this.articleRepository
      .loadArticleBySlug(route.params['slug'])
      .pipe(pluck('title'));
  }
}
