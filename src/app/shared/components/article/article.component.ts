import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { Article, User } from 'src/app/core/models';
import {
  UserRepository,
  ArticleRepository,
  AuthRepository,
} from 'src/app/core/state';

@Component({
  selector: 'app-article[article]',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;
  private readonly userRepository = inject(UserRepository);
  private readonly articleRepository = inject(ArticleRepository);
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);
  private isAuthenticated!: boolean;
  author!: User;
  ngOnInit() {
    this.userRepository
      .getUserById(this.article.userId)
      .pipe(take(1))
      .subscribe((res) => (this.author = res));
  }

  get checkFavoritedArticle(): Observable<boolean> {
    return this.authRepository.authUser$.pipe(
      tap((user) => (this.isAuthenticated = !!user)),
      switchMap((user) => {
        if (!user) {
          return of(false);
        } else {
          return of(!!user?.favoritedArticles?.includes(this.article.id));
        }
      })
    );
  }

  favoriteArticle(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/register']);
      return;
    }
    this.articleRepository.updateFavoriteArticle(this.article.id);
  }

  unfavoriteArticle(): void {
    this.articleRepository.updateUnfavoriteArticle(this.article.id);
  }
}
