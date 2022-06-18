import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs';
import { Article } from 'src/app/core/models';
import { ArticleRepository, AuthRepository } from 'src/app/core/state';
import { ArticleListComponent, TabItem, TabToggleComponent } from 'src/app/shared/components';

@UntilDestroy()
@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ArticleListComponent,
    TabToggleComponent,
  ],
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

  defaultTabList: TabItem[] = [];

  tabList: TabItem[] = [];
  activeTabTitle!: string;
  ngOnInit(): void {
    this.loadDefaultTabList();
    this.loadTrendingTag();
    if (this.authRepository.authStore.getValue().user) {
      this.loadArticleOfCurrentUser();
    } else {
      this.loadGlobalArticles();
    }
  }

  private loadArticleOfCurrentUser(): void {
    this.articleRepository
      .getArticleByUser(
        this.authRepository.authStore.getValue().user?.id!
      )
      .pipe(take(1))
      .subscribe((res) => (this.articles = res!));
  }

  private loadDefaultTabList(): void {
    this.authRepository.isAuthenticated$
      .pipe(untilDestroyed(this))
      .subscribe((isAuth) => {
        if (isAuth) {
          this.defaultTabList = [
            {
              title: 'Your Feed',
            },
            {
              title: 'Global Feed',
            },
          ];
        } else {
          this.defaultTabList = [
            {
              title: 'Global Feed',
            },
          ];
        }
        this.tabList = [...this.defaultTabList];
        this.activeTabTitle = this.tabList[0].title;
      });
  }

  private loadGlobalArticles(): void {
    this.articles$.pipe(take(1)).subscribe((articles) => {
      this.articles = articles!;
      this.cdr.markForCheck();
    });
  }

  private loadTrendingTag(): void {
    this.articles$.pipe(take(1)).subscribe((articles) => {
      const tags = articles?.flatMap((x) => x.tags);
      const timesTagDuplicated = [...new Set(tags)].map((x) => ({
        value: x,
        times: tags!.filter((i) => i === x).length,
      }));
      timesTagDuplicated.sort((a, b) => b.times - a.times);
      this.trendingTags = timesTagDuplicated.slice(0, 4).map((x) => x.value);
      this.cdr.markForCheck();
    });
  }

  selectTag(tag: string): void {
    const tagTitle = `# ${tag}`;
    this.tabList = [
      ...this.defaultTabList,
      {
        title: tagTitle,
      },
    ];
    this.activeTabTitle = tagTitle;
    this.articleRepository
      .loadArticleByTag(tag)
      .pipe(take(1))
      .subscribe((articles) => {
        this.articles = articles!;
        this.cdr.markForCheck();
      });
  }

  onTabChange(tab: TabItem): void {
    if (this.defaultTabList.some((x) => x.title === tab.title)) {
      this.tabList = [...this.defaultTabList];
      if (tab.title === 'Global Feed') {
        this.loadGlobalArticles();
      }
      if (tab.title === 'Your Feed') {
        this.loadArticleOfCurrentUser();
      }
    }
  }
}
