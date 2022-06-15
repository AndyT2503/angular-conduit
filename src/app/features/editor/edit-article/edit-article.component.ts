import { ArticleFormComponent } from './../article-form/article-form.component';
import { switchMap } from 'rxjs';
import {
  ArticleFormData,
  ArticleRepository,
} from './../../../core/state/article.repository';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Article } from 'src/app/core/models/article.model';

@UntilDestroy()
@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArticleComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly articleRepository = inject(ArticleRepository);
  private readonly router = inject(Router);
  article!: Article;
  constructor() {}

  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          const { slug } = params;
          return this.articleRepository.loadArticleBySlug(slug);
        }),
        untilDestroyed(this)
      )
      .subscribe((res) => (this.article = res));
  }

  submit(article: ArticleFormData): void {
    const oldArticle = this.articleRepository.updateArticle(
      this.article.id,
      article
    );
    if (!oldArticle) return;
    this.router.navigate(['/article', oldArticle.slug]);
  }
}
