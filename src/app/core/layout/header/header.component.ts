import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { AuthRepository } from '../../state/auth.repository';

type NavBarMenu = {
  url: string;
  title: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  indexActiveMenu = 0;

  navBarMenus: NavBarMenu[] = [];
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authRepository: AuthRepository
  ) {}

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
        this.navBarMenus = [
          {
            url: '',
            title: 'Home',
          },
          {
            url: 'editor',
            title: 'New Article',
          },
          {
            url: 'settings',
            title: 'Settings',
          },
          {
            url: `@${user.username}`,
            title: user.username,
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
        this.indexActiveMenu = this.navBarMenus.findIndex(
          (x) => currentUrl == `/${x.url}`
        );
        this.cdr.markForCheck();
      });
  }
}
