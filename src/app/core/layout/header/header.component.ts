import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
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
  private readonly router = inject(Router);
  private readonly authRepository = inject(AuthRepository);
  private readonly titleService = inject(Title);

  currentUser!: User;
  navBarMenus: NavBarMenu[] = [];

  ngOnInit(): void {
    this.loadMenu();
    this.loadCurrentUrl();
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

  loadCurrentUrl(): void {
    this.router.events
      .pipe(filter((val) => val instanceof NavigationEnd))
      .subscribe((res) => {
        const currentUrl = (res as NavigationEnd).url;
        const indexActiveMenu = this.navBarMenus.findIndex(
          (x) => currentUrl == `/${x.url}`
        );
        if (indexActiveMenu !== -1) {
          this.titleService.setTitle(
            `${this.navBarMenus[indexActiveMenu].title} - Conduit`
          );
        }
      });
  }
}
