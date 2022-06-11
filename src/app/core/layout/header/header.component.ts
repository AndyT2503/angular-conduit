import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  providers: [TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly authRepository = inject(AuthRepository);
  private readonly titleService = inject(Title);
  private readonly titleCasePipe = inject(TitleCasePipe);

  indexActiveMenu = 0;

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
        if (this.indexActiveMenu !== -1) {
          this.titleService.setTitle(
            `${this.navBarMenus[this.indexActiveMenu].title} - Conduit`
          );
        } else {
          const title = currentUrl.split('/').pop();
          this.titleService.setTitle(`${this.titleCasePipe.transform(title)?.replaceAll('-', ' ')} - Conduit`);
        }

        this.cdr.markForCheck();
      });
  }
}
