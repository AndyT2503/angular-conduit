import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { Article } from 'src/app/core/models';
import { getListMockedArticle } from 'src/app/testing.spec';
import { ArticleComponent } from '../article/article.component';

import { ArticleListComponent } from './article-list.component';

describe(ArticleListComponent.name, () => {
  const mockedArticleList: Article[] = getListMockedArticle();

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
      expect(articleComponents.length).toEqual(mockedArticleList.length);
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
