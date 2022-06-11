import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Article } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article[article]',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;

  ngOnInit(): void {
  }

}
