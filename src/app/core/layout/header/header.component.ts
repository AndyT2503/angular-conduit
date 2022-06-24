import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models';
import { AuthRepository } from '../../state';

type NavBarMenu = {
  url: string;
  title: string;
  icon?: string;
};

export const AUTH_MENU: NavBarMenu[] = [
  {
    url: '',
    title: 'Home',
  },
  {
    url: 'login',
    title: 'Sign in',
  },
  {
    url: 'register',
    title: 'Sign up',
  },
];

export const NON_AUTH_MENU: NavBarMenu[] = [
  {
    url: '',
    title: 'Home',
  },
  {
    url: 'editor',
    title: 'New Article',
    icon: 'fa-solid fa-pen-to-square',
  },
  {
    url: 'settings',
    title: 'Settings',
    icon: 'fa-solid fa-gear',
  },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly authRepository = inject(AuthRepository);

  currentUser!: User | null;
  navBarMenus: NavBarMenu[] = [];

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.authRepository.authUser$.subscribe((user) => {
      this.currentUser = user;
      this.navBarMenus = !!user ? AUTH_MENU : NON_AUTH_MENU;
    });
  }
}
