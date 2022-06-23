import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy, Component,
  inject,
  OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthRepository } from '../../state/auth.repository';

type NavBarMenu = {
  url: string;
  title: string;
  icon?: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly authRepository = inject(AuthRepository);

  currentUser!: User;
  navBarMenus: NavBarMenu[] = [];

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.authRepository.authUser$.subscribe((user) => {
      if (!user) {
        this.navBarMenus = [
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
        this.currentUser = {} as User;
      } else {
        this.currentUser = user;
        this.navBarMenus = [
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
      }
    });
  }
}
