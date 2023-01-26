import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { render, RenderResult } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { Article } from 'src/app/core/models';
import {
  ArticleRepository,
  AuthRepository,
  UserRepository,
} from 'src/app/core/state';
import { getMockedArticle, getMockedUser } from 'src/app/testing.spec';

import { Router } from '@angular/router';
import { SignUpComponent } from 'src/app/features/sign-up/sign-up.component';
import { ArticleComponent } from './article.component';
import { LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

describe(ArticleComponent.name, () => {
  let mockedArticle: Article;
  let mockedUserRepository: jasmine.SpyObj<UserRepository>;
  let mockedArticleRepository: jasmine.SpyObj<ArticleRepository>;
  let mockedRouter: Router;

  async function setup(
    mockedAuthRepository: jasmine.SpyObj<AuthRepository> = jasmine.createSpyObj<AuthRepository>(
      AuthRepository.name,
      [],
      {
        authUser$: of(getMockedUser()),
      }
    ),
    article: Article = getMockedArticle()
  ) {
    mockedArticle = article;
    mockedUserRepository = jasmine.createSpyObj<UserRepository>(
      UserRepository.name,
      ['getUserById']
    );
    mockedUserRepository.getUserById.and.returnValue(
      of(getMockedUser(article.userId))
    );

    mockedArticleRepository = jasmine.createSpyObj<ArticleRepository>(
      ArticleRepository.name,
      ['updateFavoriteArticle', 'updateUnfavoriteArticle']
    );

    const renderArticleCmp = await render(ArticleComponent, {
      componentProperties: {
        article: article,
      },
      componentProviders: [
        {
          provide: UserRepository,
          useValue: mockedUserRepository,
        },
        {
          provide: ArticleRepository,
          useValue: mockedArticleRepository,
        },
        {
          provide: AuthRepository,
          useValue: mockedAuthRepository,
        },
      ],
      routes: [
        {
          path: 'register',
          component: SignUpComponent,
        },
      ],
    });
    mockedRouter = TestBed.inject(Router);
    return renderArticleCmp;
  }

  it('Then create component', async () => {
    const { fixture } = await setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Then render author info', async () => {
    const { debugElement, fixture } = await setup();
    const authorLink = debugElement.query(By.css('.author'));
    expect(authorLink.nativeElement).toHaveAttribute(
      'href',
      '/@' + fixture.componentInstance.author!.username
    );
    expect(authorLink.nativeElement).toHaveTextContent(
      fixture.componentInstance.author!.username
    );
  });

  it('Then render article info', async () => {
    const { debugElement, fixture } = await setup();
    const articleCreationTime = debugElement.query(By.css('.date'));
    const locale = debugElement.injector.get(LOCALE_ID);
    expect(articleCreationTime.nativeElement).toHaveTextContent(
      new DatePipe(locale).transform(
        mockedArticle.creationTime,
        'MMMM d, y'
      ) as string
    );
    const articleLink = debugElement.query(By.css('.preview-link'));
    expect(articleLink.nativeElement).toHaveAttribute(
      'ng-reflect-router-link',
      '/article,' + fixture.componentInstance.article.slug
    );
    const articleTitle = debugElement.query(By.css('.title'));
    expect(articleTitle.nativeElement).toHaveTextContent(
      fixture.componentInstance.article.title
    );
    const articleDescription = debugElement.query(By.css('.description'));
    expect(articleDescription.nativeElement).toHaveTextContent(
      fixture.componentInstance.article.description
    );
    const articleTags = debugElement.queryAll(By.css('.tag-default'));
    expect(articleTags.length).toEqual(
      fixture.componentInstance.article.tags.length
    );
    articleTags.forEach((item, index) => {
      expect(item.nativeElement).toHaveTextContent(
        fixture.componentInstance.article.tags[index]
      );
    });
  });

  describe('When user is unAuthenticated', () => {
    let renderResult: RenderResult<ArticleComponent>;

    beforeEach(async () => {
      const mockedAuthRepository = jasmine.createSpyObj<AuthRepository>(
        AuthRepository.name,
        [],
        {
          authUser$: of(null),
        }
      );
      renderResult = await setup(mockedAuthRepository);
    });
    it('Then checkFavoritedArticle is false', () => {
      const { fixture } = renderResult;
      expect(fixture.componentInstance.checkFavoritedArticle).toEqual(false);
    });

    it('Hide unfavorite btn', () => {
      const { debugElement } = renderResult;
      const unfavoriteBtn = debugElement.query(By.css('.unfavorite-btn'));
      expect(unfavoriteBtn).toBeFalsy();
    });

    it('Then navigate to sign up page when toggle favorite button', async () => {
      const { debugElement } = renderResult;
      const navigateSpy = spyOn(mockedRouter, 'navigate');
      const favoriteBtn = debugElement.query(By.css('.favorite-btn'));
      await userEvent.click(favoriteBtn.nativeElement);
      expect(navigateSpy).toHaveBeenCalledWith(['/register']);
    });
  });

  describe('When user authenticated toggle favorite button', () => {
    describe('When user has not favored article yet', () => {
      it('Then toggle favorite button', async () => {
        const { debugElement } = await setup();
        const favoriteBtn = debugElement.query(By.css('.favorite-btn'));
        await userEvent.click(favoriteBtn.nativeElement);
        expect(
          mockedArticleRepository.updateFavoriteArticle
        ).toHaveBeenCalled();
      });
    });
    describe('When user has favored article yet', () => {
      it('Then toggle unfavorite button', async () => {
        const mockedAuthRepository = jasmine.createSpyObj<AuthRepository>(
          AuthRepository.name,
          [],
          {
            authUser$: of(getMockedUser(1, [1])),
          }
        );
        const { debugElement } = await setup(
          mockedAuthRepository,
          getMockedArticle(1)
        );
        const favoriteBtn = debugElement.query(By.css('.favorite-btn'));
        expect(favoriteBtn).toBeFalsy();
        const unFavoriteBtn = debugElement.query(By.css('.unfavorite-btn'));
        await userEvent.click(unFavoriteBtn.nativeElement);
        expect(
          mockedArticleRepository.updateUnfavoriteArticle
        ).toHaveBeenCalled();
      });
    });
  });
});
