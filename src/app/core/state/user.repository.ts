import { of, switchMap } from 'rxjs';
import { AuthRepository } from './auth.repository';
import { inject, Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserData } from '../data/user.data';

export type UserUpdateFormData = {
  username: string;
  bio: string;
  email: string;
  newPassword: string;
  id: number;
};

export type UserCreateFormData = {
  username: string;
  email: string;
  password: string;
};

type UserProps = {
  users: User[];
};

const userStore = createStore(
  { name: 'users' },
  withProps<UserProps>({ users: UserData })
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

  addUser(user: UserCreateFormData): User {
    const newUser = {
      email: user.email!,
      password: user.password!,
      username: user.username!,
      id: Math.random(),
    };
    const users = [...userStore.getValue().users, newUser];
    userStore.update((s) => ({
      ...s,
      users,
    }));
    return newUser;
  }

  getUserById(id: number) {
    return this.store.pipe(
      select((state) => state.users),
      switchMap((users) => of(users.find((x) => x.id === id) || ({} as User)))
    );
  }

  updateUser(updateInfo: UserUpdateFormData): void {
    const userList = userStore.getValue().users;
    const user = userList.find((x) => x.id === updateInfo.id);
    if (!user) {
      return;
    }
    const checkUsernameExist = userList.find(
      (x) => x.username === updateInfo.username
    );
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
