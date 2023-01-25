import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { Article, User } from 'src/app/core/models';
import {
  ArticleRepository,
  AuthRepository,
  UserRepository,
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
  checkFavoritedArticle!: boolean;
  author!: User;
  ngOnInit() {
    this.loadAuthor();
    this.loadAuthUser();
  }

  private loadAuthor(): void {
    this.userRepository
      .getUserById(this.article.userId)
      .pipe(take(1))
      .subscribe((res) => (this.author = res));
  }

  private loadAuthUser(): void {
    this.authRepository.authUser$.pipe(take(1)).subscribe((user) => {
      this.isAuthenticated = !!user;
      if (!this.isAuthenticated) {
        this.checkFavoritedArticle = false;
      } else {
        this.checkFavoritedArticle = !!user?.favoritedArticles?.includes(
          this.article.id
        );
      }
    });
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
