import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
