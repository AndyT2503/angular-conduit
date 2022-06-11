import { Injectable } from "@angular/core";
import { createStore, select, withProps } from "@ngneat/elf";
import { localStorageStrategy, persistState } from "@ngneat/elf-persist-state";
import { User } from "../models/user.model";

interface AuthProps {
  user: User | null;
}

const authStore = createStore(
  {name: 'auth'},
  withProps<AuthProps>({user: null})
);

export const persist = persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  readonly authUser$ = authStore.pipe(select(state => state.user));

  updateAuthUserInfo(user: AuthProps['user']): void {
    authStore.update((state) => ({
      ...state,
      user
    }));
  }

  logout(): void {
    authStore.update((state) => ({
      ...state,
      user: null
    }));
  }
}
