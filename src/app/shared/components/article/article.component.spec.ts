import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { Article } from 'src/app/core/models';
import {
  ArticleRepository,
  AuthRepository,
  UserRepository,
} from 'src/app/core/state';

import { ArticleComponent } from './article.component';

describe(ArticleComponent.name, () => {
  const mockedArticle: Article = {
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
  };

  const mockedUserRepository = jasmine.createSpyObj<UserRepository>(
    UserRepository.name,
    ['getUserById']
  );

  const mockedArticleRepository = jasmine.createSpyObj<ArticleRepository>(
    ArticleRepository.name,
    ['updateFavoriteArticle', 'updateUnfavoriteArticle']
  );

  async function setup(mockedAuthRepository: jasmine.SpyObj<AuthRepository>) {
    return await render(ArticleComponent, {
      componentProperties: {
        article: mockedArticle,
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
    });
  }

  describe('When user is unAuthenticated', () => {
    it('Then navigate to sign up page when toggle favorite button', async () => {
      const mockedAuthRepository = jasmine.createSpyObj<AuthRepository>(
        AuthRepository.name,
        [],
        {
          authUser$: of(),
        }
      );
      const { debugElement } = await setup(mockedAuthRepository);
      //const favoriteBtn =  debugElement.query(By.css())

    })
  });
});
