import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/core/models';
import { AuthRepository, UserRepository } from 'src/app/core/state';
import { SeoService } from 'src/app/shared/services/seo.service';
import { environment } from 'src/environments/environment';
import { ArticleToggleComponent } from './components/article-toggle/article-toggle.component';
import { ProfileRepository } from './state/profile.repository';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ArticleToggleComponent, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userRepository = inject(UserRepository);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly authRepository = inject(AuthRepository);
  private readonly profileRepository = inject(ProfileRepository);
  private readonly seoService = inject(SeoService);
  user!: User;

  get isLoginUser(): boolean {
    return this.authRepository.authStore.getValue().user?.id === this.user.id;
  }
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const usernameParams = params['username'] as string;
        const username = usernameParams.replace('@', '');
        const user = this.userRepository.store
          .getValue()
          .users.find((x) => x.username === username);
        if (!user) {
          this.router.navigate(['']);
        }
        this.user = user!;
        this.setSeoData(this.user);
        this.profileRepository.updateProfile(this.user);
        this.cdr.markForCheck();
      });
  }

  setSeoData(user: User): void {
    this.seoService.setTitle(`@${user.username} - Conduit`);
    const metaDefinition: MetaDefinition[] = [
      {
        name: 'title',
        content: `@${user.username} - Conduit`,
      },
      {
        name: 'description',
        content: user.bio || 'Profile of one of the many users in the system',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:title',
        content: `@${user.username} - Conduit`,
      },
      {
        name: 'twitter:description',
        content: user.bio || 'Profile of one of the many users in system',
      },
      {
        property: 'og:title',
        content: `@${user.username} - Conduit`,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: environment.appDomain + '/#/' + `@${user.username}`,
      },
      {
        property: 'og:description',
        content: `@${user.username} - Conduit`,
      },
    ];
    this.seoService.setMetaTags(metaDefinition);
  }
}
