import { inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { defer, of, switchMap } from 'rxjs';
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
  articles: Article[] | null;
};

const articleStore = createStore(
  { name: 'article' },
  withProps<ArticleProps>({ articles: GlobalArticles })
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
              (article) => article.userId === user.id
            );
            return of(articles);
          }
        })
      )
    );
  }

  loadArticleBySlug(slug: string) {
    return this.articles$.pipe(
      switchMap((res) => {
        const article = res?.find((x) => x.slug === slug);
        return of(article || ({} as Article));
      })
    );
  }

  loadArticleByTag(tag: string) {
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

  getArticleByUser(userId: number) {
    return this.articles$.pipe(
      switchMap((res) => of(res?.filter((x) => x.userId === userId)))
    );
  }

  createNewArticle(article: ArticleFormData) {
    const userAuth = this.authRepository.authStore.getValue().user;
    const newArticle: Article = {
      content: article.content,
      creationTime: new Date(),
      description: article.description,
      slug: article.title.replaceAll(' ', '-'),
      tags: article.tags,
      title: article.title,
      userId: userAuth?.id!,
      id: Math.random(),
    };

    const articleList = [...this.articleStore.getValue().articles!, newArticle];
    this.articleStore.update((state) => ({
      ...state,
      articles: articleList,
    }));
  }

  updateArticle(id: number, article: ArticleFormData) {
    const { articles } = this.articleStore.getValue();
    const oldArticle = articles?.find((x) => x.id === id);
    if (!oldArticle) return;
    oldArticle.content = article.content;
    oldArticle.description = article.description;
    oldArticle.slug = article.title.replaceAll(' ', '-');
    oldArticle.tags = article.tags;
    oldArticle.title = article.title;
    this.articleStore.update((state) => ({
      ...state,
      articles,
    }));
    return oldArticle;
  }
}
