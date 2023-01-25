import { Article, User } from './core/models';

export function getMockedArticle(id: number = 1, userId: number = 1): Article {
  return {
    content: 'mockArticle',
    creationTime: new Date(),
    slug: 'mock-article-slug',
    tags: ['implementations'],
    title: 'Mock Article',
    userId,
    id,
    description: 'mockArticle',
    favorited: 0,
  };
}

export function getMockedUser(id: number = 1, favoritedArticles: number[] = []): User {
  return {
    email: 'Gerome@mail.com',
    id,
    password: '123456',
    username: 'Gerome',
    favoritedArticles
  };
}

export function getListMockedArticle(): Article[] {
  return [
    {
      content: 'mockArticle',
      creationTime: new Date(),
      slug: 'mock-article-slug',
      tags: ['implementations'],
      title: 'Mock Article',
      userId: 1,
      id: 1,
      description: 'mockArticle',
      favorited: 0,
    },
    {
      content: 'mockArticle1',
      creationTime: new Date(),
      slug: 'mock-article-slug',
      tags: ['implementations'],
      title: 'Mock Article 1',
      userId: 2,
      id: 2,
      description: 'mockArticle1',
      favorited: 0,
    },
  ];
}
