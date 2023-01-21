import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { Article } from 'src/app/core/models';
import { ArticleComponent } from '../article/article.component';

import { ArticleListComponent } from './article-list.component';

describe(ArticleListComponent.name, () => {
  const mockedArticleList: Article[] = [
    {
      content:
        'Share your knowledge and enpower the community by creating a new implementation',
      creationTime: new Date(),
      slug: 'Create-a-new-implementation-1',
      tags: ['implementations'],
      title: 'Create a new implementation',
      userId: 1,
      id: 1,
      description:
        'Share your knowledge and enpower the community by creating a new implementation',
      favorited: 0,
    },
    {
      content:
        'Share your knowledge and enpower the community by creating a new implementation',
      creationTime: new Date(),
      slug: 'Create-a-new-implementation-1',
      tags: ['implementations'],
      title: 'Create a new implementation',
      userId: 1,
      id: 1,
      description:
        'Share your knowledge and enpower the community by creating a new implementation',
      favorited: 0,
    },
  ];

  async function setup(articleList: Article[] = []) {
    return await render(ArticleListComponent, {
      componentProperties: {
        articleList,
      },
    });
  }

  it('The create', async () => {
    const { fixture } = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  describe('When render', () => {
    it('Show article list', async () => {
      const { debugElement } = await setup(mockedArticleList);
      const articleComponents = debugElement.queryAll(
        By.directive(ArticleComponent)
      );
      expect(articleComponents.length).toEqual(2);
    });
    it('Show #noArticle when article list is empty', async () => {
      const { debugElement } = await setup();
      const noArticleElement = debugElement.query(By.css('#no-article'));
      expect(noArticleElement).toBeTruthy();
      expect(noArticleElement.nativeElement).toHaveTextContent(
        'No articles are here... yet.'
      );
    });
  });
});
