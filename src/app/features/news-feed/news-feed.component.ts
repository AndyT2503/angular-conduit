import { RouterModule } from '@angular/router';
import { Article } from './../../core/models/article.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthRepository } from 'src/app/core/state/auth.repository';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRepository } from 'src/app/core/state/article.repository';
import { ArticleComponent } from 'src/app/shared/components/article/article.component';

@UntilDestroy()
@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [CommonModule, RouterModule, ArticleComponent],
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedComponent implements OnInit {
  private readonly authRepository = inject(AuthRepository);
  private readonly articleRepository = inject(ArticleRepository);
  private readonly cdr = inject(ChangeDetectorRef);
  authUser$ = this.authRepository.authUser$;
  articles$ = this.articleRepository.articles$;

  trendingTags: string[] = [];
  articles: Article[] = [];
  ngOnInit(): void {
    this.loadArticles();
  }

  private loadArticles(): void {
    this.articles$.pipe(untilDestroyed(this)).subscribe((articles) => {
      this.articles = articles!;
      this.loadTrendingTag(articles!);
      this.cdr.markForCheck();
    });
  }

  private loadTrendingTag(articles: Article[]): void {
    const tags = articles.flatMap((x) => x.tags);
    const timesTagDuplicated = [...new Set(tags)].map((x) => ({
      value: x,
      times: tags!.filter((i) => i === x).length,
    }));
    timesTagDuplicated.sort((a, b) => b.times - a.times);
    this.trendingTags = timesTagDuplicated.slice(0, 4).map((x) => x.value);
  }
}
