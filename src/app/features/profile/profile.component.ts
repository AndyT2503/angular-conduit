import { ProfileRepository } from './state/profile.repository';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from 'src/app/core/models/user.model';
import { AuthRepository } from 'src/app/core/state/auth.repository';
import { UserRepository } from 'src/app/core/state/user.repository';
import { ArticleToggleComponent } from './components/article-toggle/article-toggle.component';

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
        this.profileRepository.updateProfile(this.user);
        this.cdr.markForCheck();
      });
  }
}
