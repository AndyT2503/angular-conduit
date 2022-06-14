import { AuthRepository } from './../../core/state/auth.repository';
import { switchMap, tap } from 'rxjs';
import { ArticleRepository } from 'src/app/core/state/article.repository';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserRepository } from 'src/app/core/state/user.repository';
import { User } from 'src/app/core/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleRepository = inject(ArticleRepository);
  private readonly authRepository = inject(AuthRepository);
  private readonly router = inject(Router);
  readonly userRepository = inject(UserRepository);

  author!: User;

  readonly authUser$ = this.authRepository.authUser$;

  article!: Article;
  ngOnInit(): void {
    this.loadArticleInfo();
  }



  loadArticleInfo(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        const articles = this.articleRepository.articleStore.getValue().articles;
        const article = articles?.find(x => x.slug === params['slug']);
        if (!article) {
          this.router.navigate(['']);
        }
        this.article = article!;
        return this.userRepository.getUserById(this.article.userId)
      }),
      tap(user => this.author = user),
      untilDestroyed(this),
    ).subscribe()
  }
}
