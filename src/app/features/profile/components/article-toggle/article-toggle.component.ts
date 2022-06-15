import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TabItem,
  TabToggleComponent,
} from 'src/app/shared/components/tab-toggle/tab-toggle.component';

@Component({
  selector: 'app-article-toggle[username]',
  standalone: true,
  imports: [CommonModule, RouterModule, TabToggleComponent],
  templateUrl: './article-toggle.component.html',
  styleUrls: ['./article-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleToggleComponent {
  private _username!: string;
  @Input() set username(value: string) {
    this._username = value;
    this.tabList = [
      {
        link: `/@${this._username}`,
        title: 'My Articles',
      },
      {
        link: `/@${this._username}/favorites`,
        title: 'Favorited Articles',
      },
    ];
  }

  get username() {
    return this._username;
  }

  tabList: TabItem[] = [];
}
