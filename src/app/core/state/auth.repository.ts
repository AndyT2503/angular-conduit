import { ArticleRepository } from 'src/app/core/state/article.repository';
import { UserRepository } from 'src/app/core/state/user.repository';
import { inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { map } from 'rxjs';
import { User } from '../models/user.model';

type AuthProps = {
  user: User | null;
};

const authStore = createStore(
  { name: 'auth' },
  withProps<AuthProps>({ user: null })
);

persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  readonly authStore = authStore;
  readonly authUser$ = authStore.pipe(select((state) => state.user));
  readonly isAuthenticated$ = authStore.pipe(
    select((state) => state.user),
    map((res) => !!res)
  );

  updateAuthUserInfo(user: AuthProps['user']): void {
    authStore.update((state) => ({
      ...state,
      user,
    }));
  }

  logout(): void {
    authStore.update((state) => ({
      ...state,
      user: null,
    }));
  }

  updateFavoriteArticles(articleId: number): void {
    const { user } = this.authStore.getValue();
    user!.favoritedArticles = [...(user?.favoritedArticles || []), articleId];
    this.updateAuthUserInfo(user);
  }

  updateUnfavoriteArticles(articleId: number): void {
    const { user } = this.authStore.getValue();
    user!.favoritedArticles = user?.favoritedArticles?.filter(x => x !== articleId);
    this.updateAuthUserInfo(user);
  }
}
