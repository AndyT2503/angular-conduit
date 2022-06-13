import { AuthRepository } from './auth.repository';
import { inject, Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

export type UserUpdate = {
  username: string;
  bio: string;
  email: string;
  newPassword: string;
  id: number;
};

type UserProps = {
  users: User[];
}

const userStore = createStore(
  { name: 'users' },
  withProps<UserProps>({ users: [] })
);

persistState(userStore, {
  key: 'users',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);
  readonly store = userStore;

  addUser(user: User): void {
    const users = [...userStore.getValue().users, user];
    userStore.update((s) => ({
      ...s,
      users,
    }));
  }

  updateUser(updateInfo: UserUpdate): void {
    const userList = userStore.getValue().users;
    const user = userList.find((x) => x.id === updateInfo.id);
    if (!user) {
      return;
    }
    const checkUsernameExist = userList.find((x) => x.username === updateInfo.username);
    if (checkUsernameExist) return;
    user.username = updateInfo.username || user.username;
    user.email = updateInfo.email || user.email;
    user.bio = updateInfo.bio;
    user.password = updateInfo.newPassword || user.password;
    userStore.update((s) => ({
      ...s,
      users: userList,
    }));
    this.authRepository.updateAuthUserInfo(user);
    this.router.navigate(['']);
  }
}
