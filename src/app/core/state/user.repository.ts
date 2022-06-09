import { Injectable } from '@angular/core';
import {
  createStore,
  getStore,
  getStoresSnapshot,
  StoreDef,
  withProps,
} from '@ngneat/elf';
import {
  addEntities,
  selectAllEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { User } from '../models/user.model';

interface UserProps {
  users: User[];
}

const userStore = createStore(
  { name: 'users' },
  withProps<UserProps>({ users: [] }),
);

export const persist = persistState(userStore, {
  key: 'users',
  storage: localStorageStrategy,
});

@Injectable({
  providedIn: 'root',
})
export class UserRepository {

  readonly store = userStore;

  addUser(user: User): void {
    const users = [...userStore.getValue().users, user];
    userStore.update(s => ({
      ...s,
      users
    }));
  }
}
