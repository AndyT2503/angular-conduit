import { ArticleFormData, ArticleRepository } from 'src/app/core/state';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewArticleComponent {
  readonly articleRepository = inject(ArticleRepository);
  readonly router = inject(Router);

  submit(article: ArticleFormData): void {
    this.articleRepository.createNewArticle(article);
    this.router.navigate(['']);
  }
}
