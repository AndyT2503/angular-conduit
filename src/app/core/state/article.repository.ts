import { UserRepository } from 'src/app/core/state/user.repository';
import { inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { defer, Observable, of, switchMap } from 'rxjs';
import { ArticleType } from 'src/app/features/profile/components/profile-article-list/profile-article-list.di';
import { GlobalArticles } from '../data/articles.data';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { AuthRepository } from './auth.repository';

export type ArticleFormData = {
  title: string;
  description: string;
  content: string;
  tags: string[];
};

type ArticleProps = {
  lastId: number;
  articles: Article[] | null;
};

const articleStore = createStore(
  { name: 'article' },
  withProps<ArticleProps>({
    articles: GlobalArticles,
    lastId: GlobalArticles[GlobalArticles.length - 1].id,
  })
);

persistState(articleStore, {
  key: 'article',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root',
})
export class ArticleRepository {
  readonly articleStore = articleStore;
  readonly articles$ = articleStore.pipe(select((state) => state.articles));
  private readonly authRepository = inject(AuthRepository);
  private readonly userRepository = inject(UserRepository);
  loadArticleByType(type: ArticleType, user: User): Observable<Article[]> {
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
              (article) => article.userId === user.id
            );
            return of(articles);
          }
        })
      )
    );
  }

  loadArticleBySlug(slug: string): Observable<Article> {
    return this.articles$.pipe(
      switchMap((res) => {
        const article = res?.find((x) => x.slug === slug);
        return of(article || ({} as Article));
      })
    );
  }

  loadArticleByTag(tag: string): Observable<Article[] | null> {
    return this.articles$.pipe(
      switchMap((res) =>
        defer(() => {
          if (!tag) {
            return of(res);
          } else {
            const articles = res!.filter((article) =>
              article.tags.includes(tag)
            );
            return of(articles);
          }
        })
      )
    );
  }

  getArticleByUser(userId: number): Observable<Article[] | undefined> {
    return this.articles$.pipe(
      switchMap((res) => of(res?.filter((x) => x.userId === userId)))
    );
  }

  createNewArticle(article: ArticleFormData): void {
    const userAuth = this.authRepository.authStore.getValue().user;
    let { lastId, articles } = articleStore.getValue();
    const newId = ++lastId;
    const newArticle: Article = {
      content: article.content,
      creationTime: new Date(),
      description: article.description,
      slug: this.generateSlug(article.title, newId),
      tags: article.tags,
      title: article.title,
      userId: userAuth?.id!,
      id: newId,
      favorited: 0,
    };

    const articleList = [...articles!, newArticle];
    this.articleStore.update((state) => ({
      ...state,
      articles: articleList,
      lastId,
    }));
  }

  updateArticle(id: number, article: ArticleFormData): Article | undefined {
    const { articles } = this.articleStore.getValue();
    const oldArticle = articles?.find((x) => x.id === id);
    if (!oldArticle) return;
    oldArticle.content = article.content;
    oldArticle.description = article.description;
    oldArticle.slug = this.generateSlug(article.title, id);
    oldArticle.tags = article.tags;
    oldArticle.title = article.title;
    this.articleStore.update((state) => ({
      ...state,
      articles,
    }));
    return oldArticle;
  }

  deleteArticle(id: number): void {
    const { articles } = this.articleStore.getValue();
    const newArticles = articles!.filter((x) => x.id !== id);
    this.articleStore.update((state) => ({
      ...state,
      articles: newArticles,
    }));
  }

  updateFavoriteArticle(articleId: number): void {
    const { user } = this.authRepository.authStore.getValue();
    const { articles } = this.articleStore.getValue();
    const oldArticle = articles?.find((x) => x.id === articleId);
    if (!oldArticle) return;
    oldArticle.favorited += 1;
    this.articleStore.update((state) => ({
      ...state,
      articles,
    }));
    this.authRepository.updateFavoriteArticles(articleId);
    this.userRepository.updateFavoriteArticlesOfUser(articleId, user?.id!);
  }

  updateUnfavoriteArticle(articleId: number): void {
    const { user } = this.authRepository.authStore.getValue();
    const { articles } = this.articleStore.getValue();
    const oldArticle = articles?.find((x) => x.id === articleId);
    if (!oldArticle) return;
    oldArticle.favorited -= 1;
    this.articleStore.update((state) => ({
      ...state,
      articles,
    }));
    this.authRepository.updateUnfavoriteArticles(articleId);
    this.userRepository.updateUnfavoriteArticlesOfUser(articleId, user?.id!);
  }

  private generateSlug(title: string, id: number): string {
    return `${title.replaceAll(' ', '-')}-${id}`;
  }
}
