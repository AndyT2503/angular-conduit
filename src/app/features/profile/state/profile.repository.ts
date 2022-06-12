import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { User } from 'src/app/core/models/user.model';

type ProfileProps = {
  user: User | null;
}

const userStore = createStore(
  { name: 'users' },
  withProps<ProfileProps>({ user: null })
);

Injectable();
export class ProfileRepository {
  readonly user$ = userStore.pipe(select((state) => state.user));

  updateProfile(user: ProfileProps['user']): void {
    userStore.update((state) => ({
      ...state,
      user,
    }));
  }
}
