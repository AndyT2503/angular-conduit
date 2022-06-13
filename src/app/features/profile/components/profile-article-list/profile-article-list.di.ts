import { InjectionToken } from '@angular/core';

export const ARTICLE_TYPE = new InjectionToken<ArticleType>('Get Article Type');

export enum ArticleType {
  MyArticle = 'myArticle',
  FavoritedArticle = 'favoritedArticle',
}

export const providerArticleType = (type: ArticleType) => {
  return [
    {
      provide: ARTICLE_TYPE,
      useValue: type,
    },
  ];
};
