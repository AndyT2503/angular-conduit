import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-new-article',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
