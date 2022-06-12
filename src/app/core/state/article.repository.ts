import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { defer, of, switchMap } from 'rxjs';
import { ArticleType } from 'src/app/features/profile/components/article-list/article-list.di';
import { GlobalArticles } from '../data/articles.data';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';

type ArticleProps = {
  articles: Article[] | null;
}

const articleStore = createStore(
  { name: 'article' },
  withProps<ArticleProps>({ articles: GlobalArticles })
);

export const persist = persistState(articleStore, {
  key: 'article',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root',
})
export class ArticleRepository {
  readonly articleStore = articleStore;
  readonly articles$ = articleStore.pipe(select((state) => state.articles));

  loadArticleByType(type: ArticleType, user: User) {
    return this.articles$.pipe(
      switchMap((res) =>
        defer(() => {
          if (type === ArticleType.FavoritedArticle) {
            const articles = res!.filter((article) =>
              user?.favoritedArticles?.includes(article.id)
            );
            return of(articles);
          } else {
            const articles = res!.filter(
              (article) => article.username === user.username
            );
            return of(articles);
          }
        })
      )
    );
  }
}
