import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Article } from 'src/app/core/models';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-article-list[articleList]',
  standalone: true,
  imports: [CommonModule, ArticleComponent],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent {
  @Input() articleList!: Article[];

}
