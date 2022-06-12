import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component,
  inject,
  OnInit
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, switchMap } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ArticleRepository } from 'src/app/core/state/article.repository';
import { ArticleComponent } from 'src/app/shared/components/article/article.component';
import { ProfileRepository } from './../../state/profile.repository';
import { ARTICLE_TYPE } from './article-list.di';

@UntilDestroy()
@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleComponent],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  private readonly articleType = inject(ARTICLE_TYPE);
  private readonly articleRepository = inject(ArticleRepository);
  private readonly profileRepository = inject(ProfileRepository);

  articleList: Article[] = [];
  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(): void {
    this.profileRepository.user$
      .pipe(
        untilDestroyed(this),
        filter((user) => !!user),
        switchMap((user) => {
          return this.articleRepository.loadArticleByType(
            this.articleType,
            user!
          );
        })
      )
      .subscribe((articles) => {
        this.articleList = articles;
      });
  }
}
