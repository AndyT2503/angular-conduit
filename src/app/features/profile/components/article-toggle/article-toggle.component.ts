import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, Input,
  OnInit
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabItem, TabToggleComponent } from 'src/app/shared/components/tab-toggle/tab-toggle.component';

@Component({
  selector: 'app-article-toggle[username]',
  standalone: true,
  imports: [CommonModule, RouterModule, TabToggleComponent],
  templateUrl: './article-toggle.component.html',
  styleUrls: ['./article-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleToggleComponent implements OnInit {
  @Input() username = '';

  tabList: TabItem[] = [];

  ngOnInit(): void {
    this.tabList = [
      {
        link: `/@${this.username}`,
        title: 'My Articles',
      },
      {
        link: `/@${this.username}/favorites`,
        title: 'Favorited Articles',
      },
    ];
  }
}
