import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { User } from '../../models';
import { AuthRepository } from '../../state';

import { AUTH_MENU, HeaderComponent, NON_AUTH_MENU } from './header.component';

const SAMPLE_USER: User = {
  email: 'mail@mail.com',
  id: 1,
  password: '123445',
  username: 'andyt',
};

async function setup() {}

describe(HeaderComponent.name, () => {
  const mockedAuthRepositoryWithAuthUser = jasmine.createSpyObj<AuthRepository>(
    AuthRepository.name,
    [],
    {
      authUser$: of(SAMPLE_USER),
    }
  );

  const mockedAuthRepositoryWithNonAuthUser =
    jasmine.createSpyObj<AuthRepository>(AuthRepository.name, [], {
      authUser$: of(null),
    });

  const setup = async (
    mockedAuthRepository: jasmine.SpyObj<AuthRepository>
  ) => {
    return await render(HeaderComponent, {
      componentProviders: [
        {
          provide: AuthRepository,
          useValue: mockedAuthRepository,
        },
      ],
    });
  };

  it('should create component', async () => {
    const { fixture } = await setup(mockedAuthRepositoryWithAuthUser);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call load menu when init', async () => {
    const { fixture } = await setup(mockedAuthRepositoryWithAuthUser);
    const component = fixture.componentInstance;
    spyOn(component, 'loadMenu');
    component.ngOnInit();
    expect(component.loadMenu).toHaveBeenCalled();
  });

  describe('when init', () => {
    describe('when has auth user', () => {
      it('should has currentUser', async () => {
        const { fixture } = await setup(mockedAuthRepositoryWithAuthUser);
        const component = fixture.componentInstance;
        expect(component.currentUser).toEqual(SAMPLE_USER);
      });

      it('should has auth menu', async () => {
        const { fixture } = await setup(mockedAuthRepositoryWithAuthUser);
        const component = fixture.componentInstance;
        expect(component.navBarMenus).toEqual(AUTH_MENU);
      });
    });

    describe('when has no auth user', () => {
      it('should not have currentUser', async () => {
        const { fixture } = await setup(mockedAuthRepositoryWithNonAuthUser);
        const component = fixture.componentInstance;
        expect(component.currentUser).toEqual(null);
      });

      it('should has non auth menu', async () => {
        const { fixture } = await setup(mockedAuthRepositoryWithNonAuthUser);
        const component = fixture.componentInstance;
        expect(component.navBarMenus).toEqual(NON_AUTH_MENU);
      });
    });
  });
});
