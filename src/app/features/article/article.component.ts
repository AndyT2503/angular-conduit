import { ArticleRepository } from 'src/app/core/state/article.repository';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleRepository = inject(ArticleRepository);
  private readonly router = inject(Router);

  article!: Article;
  ngOnInit(): void {
    this.loadArticle();
  }


  loadArticle(): void {
    this.activatedRoute.params.pipe(
      untilDestroyed(this)
    ).subscribe(
      params => {
        const articles = this.articleRepository.articleStore.getValue().articles;
        const article = articles?.find(x => x.slug === params['slug']);
        if (!article) {
          this.router.navigate(['']);
        }
        this.article = article!;
        console.log(this.article)
      }
    )
  }
}
